import React, { createContext, useContext, useState, useEffect } from 'react';
import {IOrgUnit, IOrgUnits, OrgUnitsContextType} from './types';
import {fetchUnitTreeData} from "./api";

const OrgUnitsContext = createContext<OrgUnitsContextType | undefined>(undefined);

export function OrgUnitsProvider({ children, basePath }: { children: React.ReactNode, basePath: string }) {
    const [orgUnitsData, setOrgUnitsData] = useState<IOrgUnits | null>(null);
    const [selectedOrgUnits, setSelectedOrgUnits] = useState<IOrgUnit[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newUnitTree = await fetchUnitTreeData(basePath);
                console.log("Returned tree data: ", newUnitTree);
                setOrgUnitsData(newUnitTree);
            } catch (error) {
                console.error(error);
                setError((error as Error).message);
            }
        };

        fetchData();
    }, [basePath]);

    return (
        <OrgUnitsContext.Provider
            value={{
                orgUnitsData,
                setOrgUnitsData,
                selectedOrgUnits,
                setSelectedOrgUnits,
                error
        }}
        >
            {children}
        </OrgUnitsContext.Provider>
    );
}


export function useOrgUnits() {
    const context = useContext(OrgUnitsContext);
    if (!context) {
        throw new Error('useOrgUnits must be used within an OrgUnitsProvider');
    }
    return context;
}
