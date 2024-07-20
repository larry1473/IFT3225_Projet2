export type ProjectType = {
    _id: string;
    name: string;
    hostName: string;
    guestNames: string[];
    description: string;
    createDate: Date | undefined;
    targetDate: Date | undefined;
    endDate: Date | undefined;
    requestJoin: string[];
    tasks: TaskType[];
}

export type ProjectAddType = {
    name: string;
    hostName: string;
    guestNames: string[];
    description: string;
    createDate: Date | undefined;
    targetDate: Date | undefined;
    endDate: Date | undefined;
    requestJoin: string[];
    tasks: TaskType[];
}

type TaskType = {
    _id: string;
    title: string;
    hostName: string;
    guestNames: string[];
    endDate: Date | undefined;
    createDate: Date | undefined;
    targetDate: Date | undefined;
}

type TaskAddType = {
    title: string;
    hostName: string;
    guestNames: string[];
    endDate: Date | undefined;
    createDate: Date | undefined;
    targetDate: Date | undefined;
}