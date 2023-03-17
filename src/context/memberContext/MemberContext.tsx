import React, {createContext, ReactNode, useEffect, useState,} from "react";
import MemberRepository from "../../repositories/MemberRepository";
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


    const getPage = () => {
        console.log(`Getting a new page with: currentPage: ${currentPage}, size: ${size}, roleId: ${roleId}, inputSearchValue: ${searchValue}`);
        MemberRepository.getMemberPageB(currentPage, size, roleId, searchValue)
            .then(response => {
                // console.log("Returned members data: ", response.data);
                setPage(response.data);
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
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