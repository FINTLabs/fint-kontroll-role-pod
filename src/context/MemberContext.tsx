import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchMemberData } from './api';
import {
    IMemberPage,
    MemberContextState,
} from './types';

const contextDefaultValues: MemberContextState = {
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

// Context
interface MembersContextType extends MemberContextState {}

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children, basePath }: { children: React.ReactNode, basePath: string }) {
    const [page, setPage] = useState<IMemberPage | null>(contextDefaultValues.page);
    const [currentPage, setCurrentPage] = useState<number>(contextDefaultValues.currentPage);
    const [size, setSize] = useState<number>(contextDefaultValues.size);
    const [searchValue, setSearchValue] = useState<string>(contextDefaultValues.searchValue);
    const [roleId, setRoleId] = useState<number>(contextDefaultValues.roleId);

    useEffect(() => {
        const getPage = async () => {
            try {
                // Log information about the request (remove in production)
                console.log(
                    `Getting a new member page with: currentPage: ${currentPage}, size: ${size}, roleId: ${roleId}, inputSearchValue: ${searchValue}`
                );

                const response = await fetchMemberData(basePath, currentPage, size, roleId, searchValue);
                setPage(response);
            } catch (error) {
                console.error(error);
            }
        };

        if (roleId !== 0) {
            getPage();
        }
    }, [currentPage, searchValue, size, roleId, basePath]);

    // Define the context value
    const contextValue: MembersContextType = {
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
        <MembersContext.Provider value={contextValue}>
            {children}
        </MembersContext.Provider>
    );
}

export function useMembers() {
    const context = useContext(MembersContext);
    if (!context) {
        throw new Error('useMembers must be used within a MembersProvider');
    }
    return context;
}
