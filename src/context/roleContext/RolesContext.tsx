import React, {createContext, ReactNode, useState,} from "react";
import RoleRepository from "../../repositories/RoleRepository";
import {contextDefaultValues, IRoleItem, IRolePage, RoleContextState, IResourceItem} from "./types";
//Fake data
import fakeResources from "../../repositories/resourceFakeData.json"

export const RolesContext = createContext<RoleContextState>(
    contextDefaultValues
);

type Props = {
    children: ReactNode[] | ReactNode;
};

const RolesProvider = ({children}: Props) => {
    const [role, setRole] = useState<IRoleItem | null>(contextDefaultValues.role);
    const [roles, setRoles] = useState<IRoleItem[]>(contextDefaultValues.roles);
    const [page, setPage] = useState<IRolePage | null>(contextDefaultValues.page);
    const [roleType, setRoleType] = useState<string>(contextDefaultValues.roleType)
    const [roleName, setRoleName] = useState<string>(contextDefaultValues.roleName)
    const [currentPage, setCurrentPage] = useState<number>(contextDefaultValues.currentPage);
    const [size, setSize] = useState<number>(contextDefaultValues.size);

    // is this how we will get these?
    const [resources, setResources] = useState<IResourceItem[]>(contextDefaultValues.resources);

    const getRoleById = (id: string) => {
        RoleRepository.getRoleByResourceId(id)
            .then(response => {
                    setRole(response.data)
                }
            )
            .catch((err) => {
                console.error(err);
            })
    }

    // Returns some fake data
    const getResourcesByRoleId = (roleId: string) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (fakeResources.length > 0) {
                    setResources(fakeResources);
                } else {
                    reject(new Error('No resources found for the requested role ID.'));
                }
            }, 1000);
        });
    }

    const getAllRoles = () => {
        console.log("get all roles")
        RoleRepository.getRoles()
            .then(response => {
                console.log("Returned Data: ", response.data);
                setRoles(response.data);
            })
            .catch((err) => console.error(err))
    }

    const getRolePage = (page: number, size: number, roleType: string) => {
        console.log("step 2")
        RoleRepository.getRolePage(page, size, roleType)
            .then(response => {
                console.log("Returned Data: ", response.data);
                setPage(response.data);
            })
            .catch((err) => console.error(err))

    }

    const updateRoleType = (roleType: string) => {
        setRoleType(roleType)
    }
    const updateRoleName = (roleName: string) => {
        console.log("updating role name to", roleName)
        setRoleName(roleName)
    }

    const updateCurrentPage = (currentPage: number) => {
        setCurrentPage(currentPage)
    }

    return (
        <RolesContext.Provider
            value={{
                roleType,
                roleName,
                page,
                role,
                roles,
                resources,
                currentPage,
                size,
                updateCurrentPage,
                getAllRoles,
                getRoleById,
                getRolePage,
                updateRoleType,
                updateRoleName,
                getResourcesByRoleId
            }}
        >
            {children}
        </RolesContext.Provider>
    );
};
export default RolesProvider;