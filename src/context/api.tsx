import axios, { AxiosResponse } from 'axios';
import {IMemberPage, IOrgUnits, IResourcePage} from './types';
import {IRoleItem, IRolePage} from "./types";

export const fetchUnitTreeData = async (basePath: string): Promise<IOrgUnits> => {
    try {
        const baseUrl = `${basePath}/api/orgunits`;
        console.log("fetch unit tree from: ", basePath);

        const response: AxiosResponse<IOrgUnits> = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchMemberPage = async (
    basePath: string,
    page: number,
    size: number,
    roleId: number,
    searchFor: string
): Promise<IMemberPage> => {
    try {

        const baseUrl = `${basePath}/api/roles/${roleId}/members/`;
        console.log("fetch members with: ", baseUrl);

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

        const response: AxiosResponse<IMemberPage> = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchRolePage = async (
    basePath: string,
    page: number,
    size: number,
    roleType: string,
    searchFor: string,
    organisationUnitId: string[],
    isAggregated: boolean
): Promise<IRolePage> => {
    try {
        const baseUrl = `${basePath}/api/roles`;
        console.log("fetch role data with:", baseUrl);

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
        const response: AxiosResponse<IRolePage> = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchRoleDetails = async (
    basePath: string,
    id: number,
): Promise<IRoleItem> => {
    try {
        const baseUrl = `${basePath}/api/roles/${id}`;
        const response: AxiosResponse<IRoleItem> = await axios.get(baseUrl);
        return response.data;

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchResourcePage = async (
    basePath: string,
    page: number,
    size: number,
    roleId: number,
    searchFor: string
): Promise<IResourcePage> => {
    try {
        ///assignments/role/12/resources
        const baseUrl = `${basePath}/api/assignments/role/${roleId}/resources`;
        console.log("fetch members with: ", baseUrl);

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

        const response: AxiosResponse<IResourcePage> = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};