import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchMemberData } from './api';
import {
    contextDefaultValues,
    IMemberPage,
    MemberContextState,
} from './memberContext/types';

interface MembersContextType extends MemberContextState {}

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children }: { children: React.ReactNode }) {
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

                const response = await fetchMemberData(currentPage, size, roleId, searchValue);
                setPage(response);
            } catch (error) {
                console.error(error);
            }
        };

        console.log("member provider roleid:", roleId);
        if (roleId !== 0) {
            getPage();
        }
    }, [currentPage, searchValue, size, roleId]);

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