export interface IUnitItem {
    id: number;
    resourceId: string;
    name: string;
    organisationUnitId: number;
    parentRef: number;
    childrenRef: number[];
}

export interface IUnitTree {
    totalItems: number;
    totalPages: number | any;
    currentPage: number;
    units: IUnitItem[];
}

export type UnitContextState = {
    unitTree: IUnitTree | null;
};

export const contextDefaultValues: UnitContextState = {
    unitTree: null,
};