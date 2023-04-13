export interface IRoleItem {
    "id": number;
    "roleName": string;
    "roleType": string;
    "roleSubType": string;
    "aggregatedRole": boolean;
    "organisationUnitId": string;
    "organisationUnitName": string;
}

// // How will resources look ?? Do we need this
// export interface IResourceItem {
//     id: number;
//     "icon": string;
//     "name": string;
//     "description": string;
//     "active": boolean;
// }

export interface IRolePage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    roles: IRoleItem[];
}

export type RoleContextState = {
    page: IRolePage | null;
    role: IRoleItem | null;
    currentPage: number;
    setCurrentPage: (currentPage:number) => void;
    size: number;
    setSize: (size:number) => void;
    roleType: string;
    setRoleType: (roleType:string) => void;
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
    roleId: number;
    setRoleId: (roleId: number) => void;
    isAggregate: boolean;
    setIsAggregate: (isAggregate: boolean) => void;
    orgunits: string[];
    setOrgunits: (orgunits: string[]) => void;
};

export const contextDefaultValues: RoleContextState = {
    page: null,
    role: null,
    currentPage: 0,
    setCurrentPage(currentPage: number): void {},
    size: 5,
    setSize(size: number): void {},
    roleType: "all",
    setRoleType(roleType: string): void {},
    searchValue: "",
    setSearchValue(searchValue:string): void {},
    roleId: 0,
    setRoleId(roleId:number): void {},
    isAggregate: false,
    setIsAggregate(isAggregate:boolean): void {},
    orgunits: [],
    setOrgunits(orgunits:string[]): void{},
};