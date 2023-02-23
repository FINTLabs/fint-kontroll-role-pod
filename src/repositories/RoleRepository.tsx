import axios from 'axios';
import {IRoleItem, IRolePage, IResourceItem} from "../context/roleContext/types";

const getRoles = () => {
    console.log("get roles")
    return axios.get<IRoleItem[]>('/api/role');
}

const getRoleById = (id: string) => axios.get<IRoleItem>(`/api/role/id/${id}`);

const getRolePage = (page: number, size: number, roleType: string) => {
    console.log("get roles page (skip for now)")
    if (roleType === "all") {
        return axios.get<IRolePage>(`/api/role?page=${page}&size=${size}`);
    }
    return axios.get<IRolePage>(`/api/role/${roleType}?page=${page}&size=${size}`);
}

const RoleRepository = {
    getRoles,
    getRoleByResourceId: getRoleById,
    getRolePage,
    getResourcesByRoleId(roleId: string) {

    }
};

export default RoleRepository;