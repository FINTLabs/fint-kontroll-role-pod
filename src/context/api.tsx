import axios from 'axios';
import { IMemberPage } from './types';
import {IRoleItem, IRolePage} from "./roleContext/types";

const API_BASE_URL = 'api/layout/configuration';

export const fetchMemberData = async (
    page: number,
    size: number,
    roleId: number,
    searchFor: string
): Promise<IMemberPage> => {
    try {
        const basePathResponse = await axios.get(API_BASE_URL);
        const newBasePath = basePathResponse.data.basePath;

        let baseUrl = `${newBasePath}/api/role/${roleId}/members`;
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
        const basePathResponse = await axios.get(API_BASE_URL);
        const newBasePath = basePathResponse.data.basePath;

        let baseUrl = `${newBasePath}/api/role/${id}`;

        const response = await axios.get<IRoleItem>(baseUrl);
        return response.data;

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const fetchRoleData = async (
    page: number,
    size: number,
    roleType: string,
    searchFor: string,
    organisationUnitId: number[],
    isAggregated: boolean
) : Promise<IRolePage> => {
    try {
        const basePathResponse = await axios.get(API_BASE_URL);
        const newBasePath = basePathResponse.data.basePath;

        let baseUrl = `${newBasePath}/api/role/`;

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
        const response = await axios.get<IRolePage>(url);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}