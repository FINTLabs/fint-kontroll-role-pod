export interface OrgUnit {
    id: number;
    name: string;
    organisationUnitId: string;
    parentRef: string;
    parentName: null | string;
    childrenRef: string[];
}

export interface OrgUnits {
    totalItems: number;
    orgUnits: OrgUnit[];
    totalPages: number;
    currentPage: number;
}

export type UnitContextState = {
    basePath: string;
    unitTree: OrgUnits | null;
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
};


