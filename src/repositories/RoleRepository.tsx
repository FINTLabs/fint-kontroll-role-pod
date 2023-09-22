import axios from 'axios';
import { IRoleItem, IRolePage } from "../context/roleContext/types";

const getRoles = (basePath: string) => {
    console.log("get all roles");
    const url = `${basePath}/api/role`;
    return axios.get<IRoleItem[]>(url);
}

const getRoleById = (basePath: string, id: number) => {
    const url = `${basePath}/api/roles/${id}`;
    return axios.get<IRoleItem>(url);
}

const getRolePage = (
    basePath: string,
    page: number,
    size: number,
    roleType: string,
    searchFor: string,
    organisationUnitId: number[],
    isAggregated: boolean
) => {
    let baseUrl = `${basePath}/api/roles`;
    let queryParams = [];

    const sanitizedQueryString = searchFor.trim();
    if (sanitizedQueryString.length !== 0) {
        queryParams.push(`search=${searchFor}`);
    }

    if (roleType) {
        queryParams.push(`roletype=${roleType}`);
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
