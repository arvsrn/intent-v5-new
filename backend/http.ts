import type { Server as BunServer } from "bun";

type RouteCallback = (req: Request, server: BunServer) => (Response | Promise<Response>);

/** Creates a response with the `Access-Control-Allow-Origin` header set to `http://localhost:5173` */
export const createResponse = (init?: ResponseInit, body: object | string = {}) => {
    return new Response(typeof body === "string" ? body : JSON.stringify(body) ?? "", {
        ...init,
        headers: {
            ...init?.headers,
            'Access-Control-Allow-Origin': 'http://localhost:5173',
        }
    });
}

export class Server {
    routes: Record<string, RouteCallback>;

    constructor() {
        this.routes = {};
    }

    route(path: string, fn: RouteCallback) {
        this.routes[path] = fn;
    }

    serve() {
        Bun.serve({
            port: 3301,

            static: {
                '/ping': new Response('Pong 🏓'),
            },

            fetch: async (req: Request, server: BunServer) => {
                const url = new URL(req.url);

                const callback = this.routes[url.pathname];
                
                if (callback)
                    return await callback(req, server);
                else
                    return createResponse({
                        status: 404,
                        statusText: "Not found",
                    }, "Route not found");
            },
            
            websocket: {
                message(ws, message) {
                },
                open(ws) {
                },
                close(ws, code, message) {
                },
                drain(ws) {
                },
            }
        })
    }
}