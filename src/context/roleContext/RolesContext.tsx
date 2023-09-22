import React, { createContext, ReactNode, useEffect, useState } from "react";
import RoleRepository from "../../repositories/RoleRepository";
import {
    contextDefaultValues,
    IRolePage,
    IRoleItem,
    RoleContextState,
} from "./types";
import axios from "axios";

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
    const [basePath, setBasePath] = useState<string>(contextDefaultValues.basePath);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the basePath
                const basePathResponse = await axios.get('api/layout/configuration');
                const newBasePath = basePathResponse.data.basePath;
                setBasePath(newBasePath);
                console.log("basePath in context", newBasePath);

                // Fetch other data using the basePath
                const pageResponse = await RoleRepository.getRolePage(
                    newBasePath,
                    currentPage,
                    size,
                    roleType,
                    searchValue,
                    orgunits,
                    isAggregate
                );
                const roleResponse = await RoleRepository.getRoleById(
                    newBasePath,
                    roleId
                );

                setPage(pageResponse.data);
                setRole(roleResponse.data);
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
        basePath,
    };

    return (
        <RolesContext.Provider value={contextValue}>
            {children}
        </RolesContext.Provider>
    );
};

export default RolesProvider;
