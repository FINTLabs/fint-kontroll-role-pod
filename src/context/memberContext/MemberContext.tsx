import React, {createContext, ReactNode, useEffect, useState,} from "react";
import { fetchMemberData } from '../api'; // Import the API function

import {
    contextDefaultValues,
    IMemberPage,
    MemberContextState
} from "./types";

export const MemberContext = createContext<MemberContextState>(
    contextDefaultValues
);

type Props = {
    children: ReactNode[] | ReactNode;
};

const MemberProvider = ({children}: Props) => {

    const [page, setPage] = useState<IMemberPage | null>(contextDefaultValues.page);
    const [currentPage, setCurrentPage] = useState<number>(contextDefaultValues.currentPage);
    const [size, setSize] = useState<number>(contextDefaultValues.size);
    const [searchValue, setSearchValue] = useState<string>(contextDefaultValues.searchValue);
    const [roleId, setRoleId] = useState<number>(contextDefaultValues.roleId);

    useEffect(() => {
        const getPage = () => {
            //TODO remove before production
            console.debug(`Getting a new member page with: currentPage: ${currentPage}, size: ${size}, roleId: ${roleId}, inputSearchValue: ${searchValue}`);

            fetchMemberData(currentPage, size, roleId, searchValue)
                .then(response => {
                    // console.log("Returned members data: ", response.data);
                    setPage(response);
                })
                .catch((err) => console.error(err))
        }

        if(roleId !== 0) getPage();
    }, [roleId, currentPage, searchValue, size]);

    return (
        <MemberContext.Provider
            value={{
                page,
                currentPage,
                setCurrentPage,
                size,
                setSize,
                searchValue,
                setSearchValue,
                roleId,
                setRoleId,
            }}
        >
            {children}
        </MemberContext.Provider>
    );
};
export default MemberProvider;