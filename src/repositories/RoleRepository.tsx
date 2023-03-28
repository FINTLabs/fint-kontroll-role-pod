import axios from 'axios';
import {IRoleItem, IRolePage,} from "../context/roleContext/types";
import {IMemberPage} from "../context/memberContext/types";

const getRoles = () => {
    console.log("get all roles")
    return axios.get<IRoleItem[]>('/api/role');
}


const getRoleById = (id: number) => axios.get<IRoleItem>(`/api/role/${id}`);
//
// const getRolePage = (page: number, size: number, roleType: string, searchValue:string) => {
//
//     //TODO rewrite this to build 1 url and send that
//
//
//     // Add this later, user type
//     // if (roleType === "all") {
//     //     return axios.get<IRolePage>(`/api/role?page=${page}&size=${size}`);
//     //     // return axios.get<IRolePage>(`/api/role?page=0&size=${size}`);
//     // }
//
//     // Add a search with type
//     // console.log("with search value:", searchValue)
//     const sanitizedQueryString = searchValue.trim();
//     if (sanitizedQueryString.length === 0) {
//         return axios.get<IRolePage>(`/api/role?&page=${page}&size=${size}`);
//     }
//
//     // Return a full search and add type later
//     return axios.get<IRolePage>(`/api/role?$filter=roleName contains '${sanitizedQueryString}'&page=${page}&size=${size}`);
//
//
//
// }

const getRolePage = (page: number, size: number, roleType: string, searchFor: string, isAggregated: boolean) => {

    let url = `/api/role/`;

    const sanitizedQueryString = searchFor.trim();
    if (sanitizedQueryString.length !== 0 || isAggregated) {
        url += `?$filter=`;
        if(isAggregated) url += `aggregatedRole eq '${isAggregated}'`;
        if(sanitizedQueryString.length !== 0)  url += `${isAggregated ? ' and ' : ''}roleName contains '${sanitizedQueryString}'`;
    }

    if (page) {
        url += `${sanitizedQueryString.length !== 0 || isAggregated ? '&' : '?'}page=${page}`;
    }

    if (size) {
        url += `${sanitizedQueryString.length !== 0 || isAggregated || page ? '&' : '?'}size=${size}`;
    }

    return axios.get<IRolePage>(url);

}

const RoleRepository = {
    getRoles,
    // getRoleByResourceId: getRoleById,
    getRolePage,
    getRoleById,
    // searchRoleName,
};

export default RoleRepository;