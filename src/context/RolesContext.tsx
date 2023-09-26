import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchRoleById, fetchRoleData } from './api';
import {
    contextDefaultValues,
    IRolePage,
    IRoleItem,
    RoleContextState,
} from './roleContext/types';
import { getBasePath } from './basePathUtils'; // Import the getBasePath function

interface RolesContextType extends RoleContextState {}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

export function RolesProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<IRoleItem | null>(
        contextDefaultValues.role
    );
    const [roleId, setRoleId] = useState<number>(contextDefaultValues.roleId);
    const [page, setPage] = useState<IRolePage | null>(
        contextDefaultValues.page
    );
    const [roleType, setRoleType] = useState<string>(
        contextDefaultValues.roleType
    );
    const [currentPage, setCurrentPage] = useState<number>(
        contextDefaultValues.currentPage
    );
    const [size, setSize] = useState<number>(contextDefaultValues.size);
    const [searchValue, setSearchValue] = useState<string>(
        contextDefaultValues.searchValue
    );
    const [isAggregate, setIsAggregate] = useState<boolean>(
        contextDefaultValues.isAggregate
    );
    const [orgunits, setOrgunits] = useState<number[]>(
        contextDefaultValues.orgunits
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the basePath using the getBasePath function
                const basePathValue = await getBasePath();

                // Use the basePath obtained from getBasePath in the fetchRoleData function
                const pageResponse = await fetchRoleData(
                    basePathValue, // Pass basePath here
                    currentPage,
                    size,
                    roleType,
                    searchValue,
                    orgunits,
                    isAggregate
                );
                const roleResponse = await fetchRoleById(roleId);

                return { pageResponse, roleResponse };
            } catch (error) {
                console.error(error);
                throw error;
            }
        };

        fetchData()
            .then(({ pageResponse, roleResponse }) => {
                setPage(pageResponse);
                setRole(roleResponse);
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
    ]);

    const contextValue: RolesContextType = {
        page,
        role,
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
