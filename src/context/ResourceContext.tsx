import React, {createContext, ReactNode, useState,} from "react";
import { IResourceItem, ResourceContextState,} from "./types";
import fakeResources from "../repositories/resourceFakeData.json"

const contextDefaultValues: ResourceContextState = {
    resources: [],
    roleId: 0,
    getResourcePage: () => {
    },
}
export const ResourceContext = createContext<ResourceContextState>(
    contextDefaultValues
);

type Props = {
    children: ReactNode[] | ReactNode;
};

const ResourceProvider = ({children}: Props) => {
    const [resources, setResources] = useState<IResourceItem[]>(contextDefaultValues.resources);
    const [roleId, setRoleId] = useState<number>(contextDefaultValues.roleId);


    // Returns some fake data
    const getResourcePage = () => {
        console.log("get resources page from context");
        setRoleId(0);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (fakeResources.length > 0) {
                    setResources(fakeResources);
                } else {
                    reject(new Error('No resources found for the requested role ID.'));
                }
            }, 1000);
        });
    }


    return (
        <ResourceContext.Provider
            value={{
                resources,
                roleId,
                getResourcePage,
            }}
        >
            {children}
        </ResourceContext.Provider>
    );
};

export default ResourceProvider;