/* 
    Heap contains issue and thread objects, loaded on demand via views
    On load, server sends workspace, teams and project data

    Workspace
        Team
            User
        Project
            List
                Issues
*/

type User = {
    id: ID;
    picture: string;
    handle: string;
    username: string;
    role: Role;
}

type Team = {
    id: ID;
    name: string;
    color: number;
    members: Array<ID>;
}

type Role = 'Administrator' | 'Guest' | 'Member';
type ID = string;

type Workspace = {
    id: ID;
    picture: string;
    name: string;
    teams: Team[];
    users: Array<User>;
    projects: Array<Project>;
}

type Project = {
    id: ID;
    picture: string;
    name: string;
    /// Users that have access to the project, IDs can be 
    /// of individual users or teams.
    users: Array<ID>;
    lists: Array<ID>;
    labels: Array<Label>;
}

type List = {
    id: ID;
    name: string;
    color: number;
    tasks: Task[];
}

type Task = {
    id: ID;
    title: string;
    description: string;
    labels: Array<ID>;
    estimate: number;
    due?: number;
    assignee?: ID;
}

type Label = {
    id: ID;
    name: string;
    color: number;
}

type Filter = {
    property: 'assignee' | 'label' | 'list' | 'estimate' | 'due';
    includes?: string[]; // used for assignee, label and list
    range?: [number, number]; // used for estimate and due date
}

type View = {
    name: string;
    filters: Array<Filter>;
}

type AppState = {
    currentProject: string;
    views: Array<View>;
    /// Index of the view in `views`
    currentView: number;
}

export type {
    User,
    Team,
    Workspace,
    Project,
    List,
    Task,
    Label,
    Filter,
    View,
    AppState
}

export function blurInDownwards(node: Node, props: { duration: number, transform?: string }) {
    return {
        duration: props.duration,
        css: (t: number) => {
            return `
                transform: translateY(-${4-(t*4)}px) ${props.transform ?? ""};
                scale: ${0.99 + (0.01 * t)};
                filter: blur(${1-(t*1)}px);
            `;
        }
    };
};

export function blurInUpwards(node: Node, props: { duration: number, transform?: string }) {
    return {
        duration: props.duration,
        css: (t: number) => {
            return `
                transform: translateY(${4-(t*4)}px) ${props.transform ?? ""};
                scale: ${0.99 + (0.01 * t)};
                filter: blur(${1-(t*1)}px);
            `;
        }
    };
};

export const showToast = (message: string) => {
    document.dispatchEvent(new CustomEvent("alert", {
        detail: message
    }));
}

export type Color = 'red' | 'orange' | 'yellow' | 'green' | 'lime' | 'cyan' | 'blue' | 'violet' | 'purple' | 'pink' | 'gray' | 'brown';