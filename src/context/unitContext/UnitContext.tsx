import React, {createContext, ReactNode, useEffect, useState,} from "react";
import {
    contextDefaultValues,
    IUnitTree,
    UnitContextState
} from "./types";
import UnitRepository from "../../repositories/UnitRepository";

export const UnitContext = createContext<UnitContextState>(
    contextDefaultValues
);

type Props = {
    children: ReactNode[] | ReactNode;
};

//TODO: no need to use a context?  not sure where this will be used
const UnitProvider = ({children}: Props) => {

    const [unitTree, setUnitTree] = useState<IUnitTree | null>(contextDefaultValues.unitTree);


    const getUnitTree = () => {
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