import type { ServerWebSocket } from "bun";
import { Database } from "bun:sqlite";
import { parseCookies } from "./util";
import { UAParser } from "ua-parser-js";
import { unlinkSync } from "node:fs";
import { Server } from "./http";

const generateAuthToken = () => {
    const array = new Uint32Array(8);
    crypto.getRandomValues(array);
    return Array.from(array, num => num.toString(16).padStart(8, '0')).join('');
}

const generateId = (): string => crypto.randomUUID();

namespace Password {
    export const hash = async (pwd: string) => await Bun.password.hash(pwd, {
        algorithm: "argon2id",
        memoryCost: 6,
        timeCost: 6,
    });
    
    export const verify = async (pwd: string, hash: string) => await Bun.password.verify(pwd, hash);
}

/** Creates a response with the `Access-Control-Allow-Origin` header set to `http://localhost:5173` */
const createResponse = (init?: ResponseInit, body: object = {}) => {
    return new Response(JSON.stringify(body) ?? "", {
        ...init,
        headers: {
            ...init?.headers,
            'Access-Control-Allow-Origin': 'http://localhost:5173',
        }
    });
}

const database = new Database("./data/app.sqlite");
const sessions = new Database("./data/sessions.sqlite");

database.exec(
    `
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT,
            handle TEXT,
            picture TEXT,
            email TEXT,
            password TEXT
        );
        CREATE TABLE IF NOT EXISTS workspaces (
            id TEXT PRIMARY KEY,
            name TEXT,
            picture TEXT,
            owner TEXT
        );
        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            name TEXT,
            picture TEXT,
            workspaceId TEXT
        );
        CREATE TABLE IF NOT EXISTS lists (
            id TEXT PRIMARY KEY,
            name TEXT,
            color INT,
            projectId TEXT
        );
        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            title TEXT,
            labels TEXT,
            estimate INT,
            due INT,
            assignee TEXT,
            listId TEXT
        );
        CREATE TABLE IF NOT EXISTS labels (
            id TEXT PRIMARY KEY,
            name TEXT,
            color INT,
            projectId TEXT
        );
        CREATE TABLE IF NOT EXISTS teams (
            id TEXT PRIMARY KEY,
            name TEXT,
            color INT,
            members TEXT,
            workspaceId TEXT
        );
    `
);

type SessionMetadata = {
    os: string;
    browser: string;
}

sessions.exec(
    `
        CREATE TABLE IF NOT EXISTS sessions (
            id TEXT PRIMARY KEY,
            email TEXT,
            metadata TEXT,
            last_seen INT
        );
    `
)

/** 
 * Creates a session for an email and returns the session ID.
 * Does NOT check if email is valid or if the user is authorised to create a session.
 */ 
const createSession = (email: string, metadata: SessionMetadata): string => {
    const sessionId = generateAuthToken();

    sessions
        .query(`INSERT INTO sessions (id, email, metadata, last_seen) VALUES ($id, $email, $metadata, $last_seen)`)
        .run({
            $id: sessionId,
            $email: email,
            $metadata: JSON.stringify(metadata),
            $last_seen: Date.now(),
        });
    
    return sessionId;
}

const setSessionLastSeen = (session: string) => {
    sessions
        .query(`UPDATE sessions SET last_seen = $last_seen WHERE id = $session`)
        .run({
            $last_seen: Date.now(),
            $session: session,
        });
}

const isValidSession = (session: string): boolean => {
    const user = sessions
        .query(`SELECT email FROM sessions WHERE id = $id`)
        .get({
            $id: session,
        }) as { email: string } | null;
    
    // check if user exists
    if (!user || database.query(`SELECT * FROM users WHERE email = $email`).all({ $email: user?.email }).length === 0) {
        return false;
    }
    
    const activeSessions = sessions
        .query(`SELECT * FROM sessions WHERE id=$id`)
        .all({
            $id: session,
        });
    
    return activeSessions.length > 0;
}

const server = new Server();

server.route("/auth/login", async (req) => {
    const { email, password } = await req.json();

    const result = database
        .query(`SELECT password FROM users WHERE email = $email`)
        .get({ 
            $email: email 
        }) as { password: string };

    if (!result) {
        return createResponse({
            status: 401,
            headers: {
                "Access-Control-Allow-Credentials": "true",
            }
        }, { error: "Account does not exist" });
    }

    if (await Password.verify(password, result.password)) {
        const userAgent = UAParser(req.headers.get('user-agent') ?? undefined);
        console.log(userAgent);
        
        const session = createSession(email, {
            os: `${userAgent.os.name}`,
            browser: `${userAgent.browser.name}`,
        });

        return createResponse({
            status: 200,
            statusText: "OK",
            headers: {
                "Set-Cookie": `session=${session}; Secure; HttpOnly; Path=/`,
                "Access-Control-Allow-Credentials": "true",
            }
        });
    } else {
        return createResponse({
            status: 401,
            headers: {
                "Access-Control-Allow-Credentials": "true",
            }
        }, { error: "Invalid email or password" });
    }
});

server.route("/create/account", async (req) => {
    const { email, password, username, handle, file } = await req.json();

    const result = database
        .query(`SELECT password FROM users WHERE email = $email`)
        .get({ 
            $email: email 
        }) as { password: string };

    if (!!result) {
        return createResponse({
            status: 401,
        }, { error: "Account with this email already exists" });
    }

    const id = generateId();

    database
        .query(`INSERT INTO users VALUES ($id, $username, $handle, $picture, $email, $password)`)
        .run({
            $id: id,
            $username: username,
            $handle: handle,
            $picture: `${id}.png`,
            $email: email,
            $password: await Password.hash(password),
        });

    if (file)
        fetch(file).then(async res => {
            Bun.write(`./image/${id}.png`, await res.blob()).then(x => {});
        });
    else 
        Bun.file(`./image/${id}.png`).exists().then(exists => {
            if (exists)
                unlinkSync(`./image/${id}.png`);
        });

    return createResponse({
        status: 200,
        statusText: "OK",
    });
});

server.route("/websocket", (req, server) => {
    const cookieHeader = req.headers.get("Cookie");
    const session = parseCookies(cookieHeader)["session"] ?? "";

    if (isValidSession(session)) {
        setSessionLastSeen(session);
        server.upgrade(req);

        return createResponse({
            status: 200,
            statusText: "OK",
        });
    } else {
        // delete session id on the client side if the session is invalid
        return createResponse({
            status: 401,
            headers: {
                "Set-Cookie": `session=; Secure; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
            }
        }, { error: "Invalid session" });
    }
});

server.serve();