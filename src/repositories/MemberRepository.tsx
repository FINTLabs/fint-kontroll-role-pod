import axios from 'axios';
import {IMemberPage} from "../context/memberContext/types";

const getPage = (page: number, size: number, roleId: number, searchFor: string) => {

    let url = `/api/member/role/${roleId}`;

    const sanitizedQueryString = searchFor.trim();
    if (sanitizedQueryString.length !== 0) {
        url += `?$filter=firstName contains '${sanitizedQueryString}'`;
    }

    if (page) {
        url += `${sanitizedQueryString ? '&' : '?'}page=${page}`;
    }

    if (size) {
        url += `${sanitizedQueryString || page ? '&' : '?'}size=${size}`;
    }

    return axios.get<IMemberPage>(url);

}

const MemberRepository = {
    getMemberPageB: getPage,
};

export default MemberRepository;