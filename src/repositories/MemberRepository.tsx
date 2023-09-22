import axios from 'axios';
import { IMemberPage } from "../context/memberContext/types";

const getPage = async (page: number, size: number, roleId: number, searchFor: string) => {
    // Fetch the basePath
    const basePathResponse = await axios.get('api/layout/configuration');
    const newBasePath = basePathResponse.data.basePath;

    let baseUrl = `${newBasePath}/api/role/${roleId}/members`; // Prepend basePath here
    let queryParams = [];

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
    return axios.get<IMemberPage>(url);
}

const MemberRepository = {
    getMemberPageB: getPage,
};

export default MemberRepository;
