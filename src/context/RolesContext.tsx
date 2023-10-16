import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchRolePage } from './api';
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

    useEffect(() => {
        const fetchData = async () => {
            console.log("role container basepath: ", basePath);
            try {
                const pageResponse = await fetchRolePage(
                    basePath,
                    currentPage,
                    size,
                    roleType,
                    searchValue,
                    orgunits,
                    isAggregate
                );

                return { pageResponse };
            } catch (error) {
                console.error(error);
                throw error;
            }
        };

        fetchData()
            .then(({ pageResponse }) => {
                setPage(pageResponse);
            })
            .catch((error) => {
                console.error(error);
            });
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
