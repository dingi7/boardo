import { Dispatch, SetStateAction } from "react";
import { dataBaseBoard } from "./IDatabase";
import { IUserData } from "./IUserData";

export interface IDashboardContext {
    allOrganizations: IOrgLean[] | null;
    setAllOrganizations: Dispatch<SetStateAction<IOrgLean[]>>;
    selectedOrganization: IOrg | null;
    setSelectedOrganization: Dispatch<SetStateAction<IOrg | null>>;
    boards: dataBaseBoard[] | null;
    setBoards: Dispatch<SetStateAction<dataBaseBoard[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    fetchBoards: (orgId: string) => Promise<void>;
    userOrganizations: IOrg[];
    fetchAllOrganizations: () => Promise<void>;
    setUserOrganizations: Dispatch<SetStateAction<IOrg[]>>;
    expandedOrganizationId: string;
    setExpandedOrganizationId: Dispatch<SetStateAction<string>>;
    fetching: boolean;
}

export interface IOrg {
    name: string;
    _id: string;
    owner: IUserData;
    members: IUserData[];
    orgLogo: string;
    activity: IActivity[];
}

export interface IActivity {
    action: string;
    board: string;
    timeStamp: string;
    user: {
        username: string;
        _id: string;
    };
    _id:string
}

export interface IOrgLean {
    name: string;
    _id: string;
}
