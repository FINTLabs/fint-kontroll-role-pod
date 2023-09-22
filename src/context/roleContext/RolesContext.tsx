import React, { createContext, ReactNode, useEffect, useState } from "react";
import {fetchRoleById, fetchRoleData} from '../api'; // Import the API function
import axios from "axios";
import {
    contextDefaultValues,
    IRolePage,
    IRoleItem,
    RoleContextState,
} from "./types";


export const RolesContext = createContext<RoleContextState>(
    contextDefaultValues
);

type Props = {
    children: ReactNode[] | ReactNode;
};

const RolesProvider = ({ children }: Props) => {
    const [role, setRole] = useState<IRoleItem | null>(contextDefaultValues.role);
    const [roleId, setRoleId] = useState<number>(contextDefaultValues.roleId);
    const [page, setPage] = useState<IRolePage | null>(contextDefaultValues.page);
    const [roleType, setRoleType] = useState<string>(contextDefaultValues.roleType);
    const [currentPage, setCurrentPage] = useState<number>(contextDefaultValues.currentPage);
    const [size, setSize] = useState<number>(contextDefaultValues.size);
    const [searchValue, setSearchValue] = useState<string>(contextDefaultValues.searchValue);
    const [isAggregate, setIsAggregate] = useState<boolean>(contextDefaultValues.isAggregate);
    const [orgunits, setOrgunits] = useState<number[]>(contextDefaultValues.orgunits);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const basePathResponse = await axios.get('api/layout/configuration');
                const testString = basePathResponse.data.basePath;
                console.log("base path in role context", testString);

                const pageResponse = await fetchRoleData(
                    testString,
                    currentPage,
                    size,
                    roleType,
                    searchValue,
                    orgunits,
                    isAggregate
                );
                const roleResponse = await fetchRoleById(
                    roleId
                );

                setPage(pageResponse);
                setRole(roleResponse);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [
        currentPage,
        searchValue,
        roleType,
        size,
        isAggregate,
        orgunits,
        roleId,
    ]);

    const contextValue: RoleContextState = {
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
};

export default RolesProvider;
