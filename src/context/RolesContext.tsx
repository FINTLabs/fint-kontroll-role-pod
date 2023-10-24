import React, { createContext, useContext, useState, useEffect } from 'react';
import {fetchRolePage} from './api';
import {
    IRolePage,
    RoleContextState,
} from './types';

const contextDefaultValues: RoleContextState = {
    page: null,
    currentPage: 0,
    setCurrentPage(): void {},
    size: 5,
    setSize(): void {},
    roleType: "ALLTYPES",
    setRoleType(): void {},
    searchValue: "",
    setSearchValue(): void {},
    roleId: 0,
    setRoleId(): void {},
    isAggregate: false,
    setIsAggregate(): void {},
    orgunits: [],
    setOrgunits(): void{},
    error: null,
};

interface RolesContextType extends RoleContextState {}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

export function RolesProvider({ children, basePath }: { children: React.ReactNode, basePath: string }) {

    const [roleId, setRoleId] = useState<number>(contextDefaultValues.roleId);
    const [page, setPage] = useState<IRolePage | null>(contextDefaultValues.page);
    const [roleType, setRoleType] = useState<string>(contextDefaultValues.roleType);
    const [currentPage, setCurrentPage] = useState<number>(contextDefaultValues.currentPage);
    const [size, setSize] = useState<number>(contextDefaultValues.size);
    const [searchValue, setSearchValue] = useState<string>(contextDefaultValues.searchValue);
    const [isAggregate, setIsAggregate] = useState<boolean>(contextDefaultValues.isAggregate);
    const [orgunits, setOrgunits] = useState<string[]>(contextDefaultValues.orgunits);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const getPage = async () => {
            try {
                // Log information about the request (remove in production)
                console.log(
                    `Getting a new resource page with: currentPage: ${currentPage}, size: ${size}, roleId: ${roleId}, inputSearchValue: ${searchValue}`
                );

                const response = await fetchRolePage(
                    basePath,
                    currentPage,
                    size,
                    roleType,
                    searchValue,
                    orgunits,
                    isAggregate,
                );
                setPage(response);
            } catch (error) {
                console.error(error);
                setError((error as Error).message);
            }
        };

        //TODO: Check for production and basepath ??
        if (roleId !== 0) {
            getPage();
        }
    }, [
        currentPage,
        searchValue,
        roleType,
        size,
        isAggregate,
        orgunits,
        roleId,
        basePath
    ]);

    const contextValue: RolesContextType = {
        page,
        size,
        setSize,
        searchValue,
        setSearchValue,
        currentPage,
        setCurrentPage,
        roleType,
        setRoleType,
        roleId,
        setRoleId,
        isAggregate,
        setIsAggregate,
        orgunits,
        setOrgunits,
        error
    };

    return (
        <RolesContext.Provider value={contextValue}>
            {children}
        </RolesContext.Provider>
    );
}

export function useRoles() {
    const context = useContext(RolesContext);
    if (!context) {
        throw new Error('useRoles must be used within a RolesProvider');
    }
    return context;
}
