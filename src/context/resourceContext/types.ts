export interface IResourceItem {
    id: number;
    "icon": string;
    "name": string;
    "description": string;
    "active": boolean;
}

export type ResourceContextState = {
    resources: IResourceItem[];
    roleId : number;
    getResourcePage: () => void;
};

export const contextDefaultValues: ResourceContextState = {
    resources: [],
    roleId: 0,
    getResourcePage: () => {
    },
};