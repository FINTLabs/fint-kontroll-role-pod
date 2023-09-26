import axios from 'axios';
import {IMemberPage, OrgUnits} from './types';
import {IRoleItem, IRolePage} from "./roleContext/types";

const configUrl = 'api/layout/configuration';

export const fetchUnitTreeData = async () : Promise <OrgUnits> => {
    try {
        const basePathResponse = await axios.get('api/layout/configuration');
        const newBasePath = basePathResponse.data.basePath;
        console.log("basePath in fetch unit data", newBasePath);
        let baseUrl = `${newBasePath}/api/orgunits`;

        const response = await axios.get<OrgUnits>(baseUrl);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }

}


export const fetchMemberData = async (
    page: number,
    size: number,
    roleId: number,
    searchFor: string
): Promise<IMemberPage> => {
    try {
        console.log("inside fetchmember data and trying to get a config from: ", configUrl);
        const basePathResponse = await axios.get(configUrl);
        const newBasePath = basePathResponse.data.basePath;
        console.log("base path from config in fetch members: ", newBasePath);

        let baseUrl = `${newBasePath}/api/roles/${roleId}/members`;
        let queryParams: string[] = [];

        const sanitizedQueryString = searchFor.trim();
        if (sanitizedQueryString.length !== 0) {
            queryParams.push(`search=${searchFor}`);
        }

        if (page) {
            queryParams.push(`page=${page}`);
        }

        if (size) {
            queryParams.push(`size=${size}`);
        }

        const url = `${baseUrl}${queryParams.length > 0 ? '?' : ''}${queryParams.join('&')}`;

        const response = await axios.get<IMemberPage>(url);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchRoleById = async (id: number) => {
    try {
        const basePathResponse = await axios.get(configUrl);
        const newBasePath = basePathResponse.data.basePath;
        console.log("base path from config in fetch role by id: ", newBasePath);

        let baseUrl = `${newBasePath}/api/roles/${id}`;

        const response = await axios.get<IRoleItem>(baseUrl);
        return response.data;

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const fetchRoleData = async (
    basePath: string,
    page: number,
    size: number,
    roleType: string,
    searchFor: string,
    organisationUnitId: number[],
    isAggregated: boolean
) : Promise<IRolePage> => {
    try {
        let baseUrl = `${basePath}api/roles/`;

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

        console.log("here is my new basepath url role data: ", url);
        const response = await axios.get<IRolePage>(url);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}