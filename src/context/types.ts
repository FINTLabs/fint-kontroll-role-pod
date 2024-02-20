export interface IOrgUnit {
    id: number;
    name: string;
    organisationUnitId: string;
    parentRef: string;
    parentName: null | string;
    childrenRef: string[];
}

export interface IOrgUnits {
    totalItems: number;
    orgUnits: IOrgUnit[];
    totalPages: number;
    currentPage: number;
}

export interface OrgUnitsContextType {
    orgUnitsData: IOrgUnits | null;
    setOrgUnitsData: (data: IOrgUnits | null) => void;
    selectedOrgUnits: IOrgUnit[];
    setSelectedOrgUnits: (orgUnits: IOrgUnit[]) => void;
    error: string | null;
}

export interface IRoleItem {
    "id": number;
    "roleName": string;
    "roleType": string;
    "roleSubType": string;
    "aggregatedRole": boolean;
    "organisationUnitId": string;
    "organisationUnitName": string;
}

export interface IRolePage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    roles: IRoleItem[];
}

export type RoleContextState = {
    page: IRolePage | null;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    size: number;
    setSize: (size: number) => void;
    roleType: string;
    setRoleType: (roleType: string) => void;
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
    roleId: number;
    setRoleId: (roleId: number) => void;
    isAggregate: boolean;
    setIsAggregate: (isAggregate: boolean) => void;
    orgunits: string[];
    setOrgunits: (orgunits: string[]) => void;
    error: string | null;
};

export interface IMemberPage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    size: number;
    members: IMemberItem[];
}

export interface IMemberItem {
    id: number;
    resourceId: string;
    firstName: string;
    lastName: string;
    userType: string;
    userName?: null;
    userId?: null;
}

export type MemberContextState = {
    page: IMemberPage | null;
    size: number;
    setSize: (size: number) => void;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
    roleId: number;
    setRoleId: (roleId: number) => void;
    error: string | null;
};

export interface IResourcePage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    size: number;
    //assignments: IResourceItem[];
    resources: IResourceItem[]
}

export interface IResourceItem {
    id: number;
    resourceId: string;
    resourceName: string;
    resourceType: string;
    assignmentRef: number;
    assignerUsername: string,
    assignerDisplayname: string,
    /*resourceRef: number,
    azureGroupRef: number,
    resourceName: string,
    userRef: number,
    azureUserRef: number,
    userDisplayname: string,
    userUsername: string,
    userType: string,
    assignerRef: number,
    assignerDisplayname: string,
    assignerUsername: string,
    roleRef: number,
    organizationUnitId: string*/
}

export type ResourceContextState = {
    page: IResourcePage | null;
    size: number;
    setSize: (size: number) => void;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
    roleId: number;
    setRoleId: (roleId: number) => void;
    error: string | null;
};