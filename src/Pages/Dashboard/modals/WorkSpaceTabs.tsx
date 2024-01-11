import { Input } from 'postcss';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/Components/tabs';
import { Button } from 'src/Components/ui/button';
import { Label } from 'src/Components/ui/label';
import { Card } from 'src/Pages/Board/components/Card';
import { SearchComponent } from '../components/SearchComponent';
import { JoinDialog } from './JoinWorkspaceDialog';
import { dataBaseOrganization } from 'src/Interfaces/IDatabase';
import { IOrgLean } from '../contexts/DashboardContextProvider';

type AddWorkspaceModalProps = {
    closeModal: () => void;
    allOrganizations: IOrgLean[];
    fetchAllOrganizations: any;
    setUserOrganizations: (organizations: any) => void;
    setSelectedOrganization: (organization: any) => void;
};

export const WorkspaceTabs = ({
    closeModal,
    allOrganizations,
    setUserOrganizations,
    setSelectedOrganization,
}: AddWorkspaceModalProps) => {


    return (
        <Tabs defaultValue='join' className='w-[400px] justify-center'>
            <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='join'>Join</TabsTrigger>
                <TabsTrigger value='create'>Create</TabsTrigger>
            </TabsList>
            <TabsContent value='join'>
                <form className='h-[80%] flex flex-col w-full mx-auto text-center justify-center'>
                    <div className='h-[100%] flex flex-col gap-3  items-start justify-center overflow-hidden'>
                        <label
                            htmlFor='workspaceName'
                            className='font-medium mx-auto'
                        >
                            Workspace name
                        </label>
                        <SearchComponent />
                        <div className='h-[50%] w-[40%] overflow-y-auto no-scrollbar mx-auto'>
                            {allOrganizations!.map(
                                (org: dataBaseOrganization) => (
                                    <JoinDialog
                                        orgName={org.name}
                                        orgId={org._id}
                                        key={org._id}
                                    ></JoinDialog>
                                )
                            )}
                        </div>
                    </div>
                </form>
            </TabsContent>
            <TabsContent value='create'></TabsContent>
        </Tabs>
    );
};
