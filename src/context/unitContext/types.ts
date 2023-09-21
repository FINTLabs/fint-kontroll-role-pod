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
    orgUnits: IUnitItem[];
}

export type UnitContextState = {
    basePath: string;
    unitTree: IUnitTree | null;
};

export const contextDefaultValues = {
    basePath: '',
    unitTree: null,
};