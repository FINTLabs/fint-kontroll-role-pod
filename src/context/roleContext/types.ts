export interface IRoleItem {
    "id": number;
    "roleId": string;
    "resourceId": string;
    "roleName": string;
    "roleType": string;
    "roleSubType": string;
    "aggregatedRole": boolean;
    "roleSource": string;
    "members": IMemberItem[];
}

interface IMemberItem {
    id: number;
    resourceId: string;
    firstName: string;
    lastName: string;
    userType: string;
    userName?: null;
    userId?: null;
}

// How will resources look ?? Do we need this
export interface IResourceItem {
    id: number;
    "icon": string;
    "name": string;
    "description": string;
    "active": boolean;
}

export interface IRolePage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    roles: IRoleItem[];
}

export type RoleContextState = {
    role: IRoleItem | null;
    roles: IRoleItem[];
    resources: IResourceItem[];
    page: IRolePage | null;
    currentPage: number;
    size: number;
    updateCurrentPage: (currentPage: number) => void;
    roleType: string;
    roleName: string;
    getRoleById: (id: string) => void;
    getAllRoles: () => void;
    getRolePage: (page: number, size: number, roleType: string) => void;
    updateRoleType: (roleType: string) => void;
    updateRoleName: (roleType: string) => void;
    getResourcesByRoleId: (roleId: string) => void;
};

export const contextDefaultValues: RoleContextState = {
    roleType: "all",
    roleName: "all",
    role: null,
    roles: [],
    resources: [],
    page: null,
    currentPage: 0,
    size: 5,
    getAllRoles: () => {
    },
    getRoleById: (id: string) => {
    },
    getRolePage: (page: number, size: number, roleType: string) => {
    },
    updateRoleType(roleType: string): void {
    },
    updateRoleName(roleName: string): void {
    },
    updateCurrentPage(currentPage: number): void {
    },
    getResourcesByRoleId(roleId: string): void {
    },
};