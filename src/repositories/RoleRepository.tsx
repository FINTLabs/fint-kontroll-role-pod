import axios from 'axios';
import {IRoleItem, IRolePage,} from "../context/roleContext/types";

const getRoles = () => {
    console.log("get all roles")
    return axios.get<IRoleItem[]>('/api/role');
}

const getRoleById = (id: number) => axios.get<IRoleItem>(`/api/roles/${id}`);

const getRolePage = (page: number, size: number, roleType: string, searchFor: string, organisationUnitId: string[], isAggregated: boolean) => {

    let baseUrl = `/api/roles/`;
    let queryParams = [];

    const sanitizedQueryString = searchFor.trim();
    if (sanitizedQueryString.length !== 0) {
        queryParams.push(`search=${searchFor}`);
    }

    if (roleType) {
        queryParams.push(`userType=${roleType}`);
    }

    if (isAggregated) {
        queryParams.push(`aggroles=${isAggregated}`);
    }

    if (organisationUnitId && organisationUnitId.length > 0) {
        queryParams.push(`orgunits=${organisationUnitId}`);
    }

    if (page) {
        queryParams.push(`page=${page}`);
    }

    if (size) {
        queryParams.push(`size=${size}`);
    }

    const url = `${baseUrl}${queryParams.length > 0 ? '?' : ''}${queryParams.join('&')}`;
    return axios.get<IRolePage>(url);
}

const RoleRepository = {
    getRoles,
    getRolePage,
    getRoleById,
};

export default RoleRepository;