import React, { createContext, useContext, useState, useEffect } from 'react';
import {OrgUnit, OrgUnits} from './types';
import axios from "axios";

// Context
interface OrgUnitsContextType {
    orgUnitsData: OrgUnits | null;
    setOrgUnitsData: (data: OrgUnits | null) => void;
    selectedOrgUnits: OrgUnit[]; // Store selected orgUnits in an array
    setSelectedOrgUnits: (orgUnits: OrgUnit[]) => void; // Function to set selected orgUnits
}

const OrgUnitsContext = createContext<OrgUnitsContextType | undefined>(undefined);

export function OrgUnitsProvider({ children }: { children: React.ReactNode }) {
    const [orgUnitsData, setOrgUnitsData] = useState<OrgUnits | null>(null);
    //const [basePath, setBasePath] = useState<string>(contextDefaultValues.basePath);
    const [selectedOrgUnits, setSelectedOrgUnits] = useState<OrgUnit[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the basePath
                const basePathResponse = await axios.get('api/layout/configuration');
                const newBasePath = basePathResponse.data.basePath;
                //setBasePath(newBasePath);
                console.log("basePath in context", newBasePath);

                // Fetch the unitTree using the updated basePath
                const unitTreeResponse = await axios.get<OrgUnits>(
                    `${newBasePath}/api/orgunits/`
                );
                const newUnitTree = unitTreeResponse.data;
                console.log("Returned tree data: ", newUnitTree);
                setOrgUnitsData(newUnitTree);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <OrgUnitsContext.Provider
            value={{ orgUnitsData, setOrgUnitsData, selectedOrgUnits, setSelectedOrgUnits }}
        >
            {children}
        </OrgUnitsContext.Provider>
    );
}

// Create a custom hook to access the context
export function useOrgUnits() {
    const context = useContext(OrgUnitsContext);
    if (!context) {
        throw new Error('useOrgUnits must be used within an OrgUnitsProvider');
    }
    return context;
}
