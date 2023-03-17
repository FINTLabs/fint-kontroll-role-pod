export interface IMemberItem {
    id: number;
    resourceId: string;
    firstName: string;
    lastName: string;
    userType: string;
    userName?: null;
    userId?: null;
}

export interface IMemberPage {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    size: number;
    members: IMemberItem[];
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

export const contextDefaultValues: MemberContextState = {
    page: null,
    currentPage: 0,
    size: 5,
    searchValue:"",
    roleId:0,
    setSearchValue: (searchValue) => {},
    setCurrentPage(currentPage: number): void {},
    setSize(size: number): void {},
    setRoleId(roleId:number): void {},
};