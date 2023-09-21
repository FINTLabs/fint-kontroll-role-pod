import React, { createContext, ReactNode, useEffect, useState } from "react";
import { contextDefaultValues, IUnitTree, UnitContextState } from "./types";
import axios from "axios";

export const UnitContext = createContext<UnitContextState>(
    contextDefaultValues
);

type Props = {
    children: ReactNode[] | ReactNode;
};

const UnitProvider = ({ children }: Props) => {
    const [unitTree, setUnitTree] = useState<IUnitTree | null>(
        contextDefaultValues.unitTree
    );
    const [basePath, setBasePath] = useState<string>(
        contextDefaultValues.basePath
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the basePath
                const basePathResponse = await axios.get('api/layout/configuration');
                const newBasePath = basePathResponse.data.basePath;
                setBasePath(newBasePath);
                console.log("basePath in context", newBasePath);

                // Fetch the unitTree using the updated basePath
                const unitTreeResponse = await axios.get<IUnitTree>(
                    `${newBasePath}/api/orgunits/`
                );
                const newUnitTree = unitTreeResponse.data;
                console.log("Returned tree data: ", newUnitTree);
                setUnitTree(newUnitTree);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <UnitContext.Provider
            value={{
                unitTree,
                basePath,
            }}
        >
            {children}
        </UnitContext.Provider>
    );
};

export default UnitProvider;
