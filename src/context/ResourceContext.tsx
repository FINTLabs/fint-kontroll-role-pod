import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchResourcePage } from './api';
import {
    IResourcePage,
    ResourceContextState,
} from './types';

const contextDefaultValues: ResourceContextState = {
    page: null,
    currentPage: 0,
    size: 5,
    searchValue:"",
    roleId:0,
    setSearchValue: () => {},
    setCurrentPage(): void {},
    setSize(): void {},
    setRoleId(): void {},
};

interface ResourceContextType extends ResourceContextState {}

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export function ResourceProvider({ children, basePath }: { children: React.ReactNode, basePath: string }) {
    const [page, setPage] = useState<IResourcePage | null>(contextDefaultValues.page);
    const [currentPage, setCurrentPage] = useState<number>(contextDefaultValues.currentPage);
    const [size, setSize] = useState<number>(contextDefaultValues.size);
    const [searchValue, setSearchValue] = useState<string>(contextDefaultValues.searchValue);
    const [roleId, setRoleId] = useState<number>(contextDefaultValues.roleId);

    useEffect(() => {
        const getPage = async () => {
            try {
                // Log information about the request (remove in production)
                console.log(
                    `Getting a new resource page with: currentPage: ${currentPage}, size: ${size}, roleId: ${roleId}, inputSearchValue: ${searchValue}`
                );

                const response = await fetchResourcePage(basePath, currentPage, size, roleId, searchValue);
                setPage(response);
            } catch (error) {
                console.error(error);
            }
        };

        //TODO: Check for production and basepath ??
        if (roleId !== 0) {
            getPage();
        }
    }, [currentPage, searchValue, size, roleId, basePath]);

    // Define the context value
    const contextValue: ResourceContextType = {
        page,
        currentPage,
        setCurrentPage,
        size,
        setSize,
        searchValue,
        setSearchValue,
        roleId,
        setRoleId,
    };

    return (
        <ResourceContext.Provider value={contextValue}>
            {children}
        </ResourceContext.Provider>
    );
}

export function useResource() {
    const context = useContext(ResourceContext);
    if (!context) {
        throw new Error('useResource must be used within a ResourceProvider');
    }
    return context;
}
