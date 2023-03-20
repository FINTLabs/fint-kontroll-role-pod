import React, {createContext, ReactNode, useEffect, useState,} from "react";
import MemberRepository from "../../repositories/MemberRepository";
import {
    contextDefaultValues,
    IUnitItem, IUnitTree,
    UnitContextState
} from "./types";
import UnitRepository from "../../repositories/UnitRepository";

export const UnitContext = createContext<UnitContextState>(
    contextDefaultValues
);

type Props = {
    children: ReactNode[] | ReactNode;
};

const UnitProvider = ({children}: Props) => {

    const [unitTree, setUnitTree] = useState<IUnitTree | null>(contextDefaultValues.unitTree);


    const getUnitTree = () => {
        console.log(`Getting a the units stree:`);
        UnitRepository.getUnitTree()
            .then(response => {
                console.log("Returned tree data: ", response.data);
                setUnitTree(response.data);
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        getUnitTree();
    }, []);

    return (
        <UnitContext.Provider
            value={{
                unitTree,
            }}
        >
            {children}
        </UnitContext.Provider>
    );
};
export default UnitProvider;