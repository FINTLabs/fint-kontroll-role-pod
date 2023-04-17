import axios from 'axios';
import {IMemberPage} from "../context/memberContext/types";

const getPage = (page: number, size: number, roleId: number, searchFor: string) => {

    let baseUrl = `/api/member/role/${roleId}/`;
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