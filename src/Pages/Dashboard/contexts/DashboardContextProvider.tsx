import { createContext, useCallback, useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { IDashboardContext, IOrg, IOrgLean } from 'src/Interfaces/IContexts';
import {
    createOrganization,
    getAllOrganizations,
    getBoardsByOrgId,
    getUserOrganizations,
} from '../../../api/requests';
import { useToast } from '../../../Components/Toaster/use-toast';
import { dataBaseBoard } from '../../../Interfaces/IDatabase';

export const DashboardContext = createContext<IDashboardContext | undefined>(
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

    const fetchBoards = useCallback(
        async (orgId: string) => {
            try {
                setFetching(true);
                const data = await getBoardsByOrgId(orgId);
                setBoards(data.boards || []);
                setExpandedOrganizationId(orgId);
            } catch (err: any) {
                toast({
                    title: err.message,
                    variant: 'destructive',
                });
            } finally {
                setFetching(false);
            }
        },
        [toast]
    );

    const fetchAllOrganizations = useCallback(async () => {
        setAllOrganizations(await getAllOrganizations());
    }, []);

    const fetchOrganizations = useCallback(async () => {
        try {
            const organizations = await getUserOrganizations();
            if (organizations.length > 0) {
                setUserOrganizations(organizations);
                setSelectedOrganization(organizations[0]);
                if (!boards) await fetchBoards(organizations[0]._id);
            } else {
                setSelectedOrganization(null);
            }
        } catch (err: any) {
            toast({
                title: err.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [toast, fetchBoards, boards]);

    useEffect(() => {
        if (!user || !localStorage['x-authorization']) return;
        fetchAllOrganizations();
        fetchOrganizations();
    }, [user]);

    useEffect(() => {
        if (selectedOrganization) {
            fetchBoards(selectedOrganization._id);
        }
        console.log(selectedOrganization)
    }, [selectedOrganization]);

    const handleCreateWorkspace = async (
        workspaceData: { name: string; password: string },
        closeModal: () => void
    ) => {
        const result = await createOrganization(workspaceData);
        setUserOrganizations((prev: any) => [...prev, result]);
        setSelectedOrganization(result);
        closeModal();
    };

    return (
        <DashboardContext.Provider
            value={{
                allOrganizations,
                setAllOrganizations,
                selectedOrganization,
                setSelectedOrganization,
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
                fetching,
                handleCreateWorkspace, // Make this function available in context
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
