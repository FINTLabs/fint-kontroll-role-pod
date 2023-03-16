import React, {createContext, ReactNode, useEffect, useState,} from "react";
import RoleRepository from "../../repositories/RoleRepository";
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

const RolesProvider = ({children}: Props) => {
    const [role, setRole] = useState<IRoleItem | null>(contextDefaultValues.role);
    const [roleId, setRoleId] = useState<number>(contextDefaultValues.roleId);
    const [page, setPage] = useState<IRolePage | null>(contextDefaultValues.page);
    const [roleType, setRoleType] = useState<string>(contextDefaultValues.roleType)
    const [currentPage, setCurrentPage] = useState<number>(contextDefaultValues.currentPage);
    const [size, setSize] = useState<number>(contextDefaultValues.size);
    const [searchValue, setSearchValue] = useState<string>(contextDefaultValues.searchValue);

    const getPage = () => {
    //     const getPage = async () => {
        RoleRepository.getRolePage(currentPage, size, roleType, searchValue)
            .then(response => {
                console.log("Returned Data: ", response.data);
                setPage(response.data);
            })
            .catch((err) => console.error(err))

    }

    const getRole = () => {
        //     const getPage = async () => {
        RoleRepository.getRoleById(roleId)
            .then(response => {
                console.log("Returned Data: ", response.data);
                setRole(response.data);
            })
            .catch((err) => console.error(err))

    }

    useEffect(() => {
        getPage();
    }, [currentPage, searchValue, roleType]);

    useEffect(() => {
        getRole();
    }, [roleId]);

    return (
        <RolesContext.Provider
            value={{
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
            }}
        >
            {children}
        </RolesContext.Provider>
    );
};

export default RolesProvider;