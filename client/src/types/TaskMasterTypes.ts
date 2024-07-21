export type ProjectType = {
    _id: string;
    name: string;
    hostName: string;
    guestNames: string[];
    description: string;
    createDate: Date;
    targetDate: Date;
    endDate: Date;
    requestJoin: string[];
    tasks: TaskType[];
}

export type ProjectAddType = {
    name: string;
    hostName: string;
    guestNames: string[];
    description: string;
    createDate: Date;
    targetDate: Date;
    endDate: Date;
    requestJoin: string[];
    tasks: TaskType[];
}

export type TaskType = {
    _id: string;
    title: string;
    hostName: string;
    guestNames: string[];
    endDate: Date;
    createDate: Date;
    targetDate: Date;
}

export type TaskAddType = {
    title: string;
    hostName: string;
    guestNames: string[];
    endDate: Date;
    createDate: Date;
    targetDate: Date;
}