// api.ts
import axios from 'axios';
import { IMemberPage } from './types';

const API_BASE_URL = '/api/layout/configuration';

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
        // Handle errors here
        console.error('API Error:', error);
        throw error;
    }
};
