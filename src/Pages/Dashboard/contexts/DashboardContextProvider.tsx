import {
    createContext,
    useState,
    useCallback,
    useEffect,
    Dispatch,
    SetStateAction,
} from 'react';
import { dataBaseBoard } from '../../../Interfaces/IDatabase';
import {
    getAllOrganizations,
    getBoardsByOrgId,
    getUserOrganizations,
} from '../../../api/requests';
import { useToast } from '../../../Components/Toaster/use-toast';
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
    setUserOrganizations: Dispatch<SetStateAction<IOrg[]>>;
    expandedOrganizationId: string;
    setExpandedOrganizationId: Dispatch<SetStateAction<string>>;
    fetching: boolean
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

export const DashboardContextProvider = ({ children }: { children: any }) => {
    const { toast } = useToast();
    const auth = useAuthUser();
    const user = auth()!;

    const [allOrganizations, setAllOrganizations] = useState<IOrgLean[]>([]);
    const [userOrganizations, setUserOrganizations] = useState<IOrg[]>([]);
    const [selectedOrganization, setSelectedOrganization] =
        useState<IOrg | null>(null);
    const [boards, setBoards] = useState<dataBaseBoard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fetching, setFetching] = useState<boolean>(false);   
    const [expandedOrganizationId, setExpandedOrganizationId] =
        useState<string>('');

    const fetchBoards = useCallback(async (orgId: string) => {
        try {
            setFetching(true);
            const data = await getBoardsByOrgId(orgId);
            setBoards(data.boards || []);
        } catch (err: any) {
            toast({
                title: err.message,
                variant: "destructive" 
            });
        } finally {
            setFetching(false);
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
                setSelectedOrganization(organizations[0]);
                await fetchBoards(organizations[0]._id);
            } else {
                setSelectedOrganization(null);
            }
        } catch (err: any) {
            toast({
                title: err.message,
                variant: "destructive" 
            });
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
                selectedOrganization: selectedOrganization,
                setSelectedOrganization: setSelectedOrganization,
                boards,
                setBoards,
                loading,
                setLoading,
                fetchBoards,
                userOrganizations,
                fetchAllOrganizations,
                setUserOrganizations,
                setExpandedOrganizationId,
                expandedOrganizationId,
                fetching
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
