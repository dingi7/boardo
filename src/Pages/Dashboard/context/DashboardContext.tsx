import {
    createContext,
    useState,
    useCallback,
    useEffect,
    Dispatch,
    SetStateAction,
} from 'react';
import {
    dataBaseBoard
} from '../../../Interfaces/IDatabase';
import {
    getAllOrganizations,
    getBoardsByOrgId,
    getUserOrganizations,
} from '../../../api/requests';
import { errorNotification } from '../../../util/notificationHandler';
import { useAuthUser } from 'react-auth-kit';

export interface DashboardContextType {
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
}

export interface IOrg {
    name: string;
    _id: string;
    orgLogo: string;
}

export interface IOrgLean {
    name: string;
    _id: string;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined
);

export const DashboardProvider = ({ children }: { children: any }) => {
    const auth = useAuthUser();
    const user = auth()!;

    const [allOrganizations, setAllOrganizations] = useState<IOrgLean[]>([]);
    const [userOrganizations, setUserOrganizations] = useState<IOrg[]>([]);
    const [selectedOrganisation, setSelectedOrganisation] =
        useState<IOrg | null>(null);
    const [boards, setBoards] = useState<dataBaseBoard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchBoards = useCallback(async (orgId: string) => {
        try {
            const data = await getBoardsByOrgId(orgId);
            setBoards(data.boards || []);
        } catch (err: any) {
            errorNotification(err);
        }
    }, []);

    const fetchAllOrganizations = useCallback(async () => {
        setAllOrganizations(await getAllOrganizations());
    }, []);

    const fetchOrganizations = useCallback(async () => {
        try {
            const organizations = await getUserOrganizations();
            if (organizations.length > 0) {
                setUserOrganizations(organizations);
                setSelectedOrganisation(organizations[0]);
                await fetchBoards(organizations[0]._id);
            } else {
                setSelectedOrganisation(null);
            }
        } catch (err: any) {
            errorNotification(err);
        } finally {
            setLoading(false);
        }
    }, [fetchBoards]);

    useEffect(() => {
        if (!user) return;
        fetchAllOrganizations();
        fetchOrganizations();
    }, [user, fetchOrganizations]);

    return (
        <DashboardContext.Provider
            value={{
                allOrganizations,
                setAllOrganizations,
                selectedOrganization: selectedOrganisation,
                setSelectedOrganization: setSelectedOrganisation,
                boards,
                setBoards,
                loading,
                setLoading,
                fetchBoards,
                userOrganizations,
                fetchAllOrganizations
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
