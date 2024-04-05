import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/Components/tabs';
import { Button } from 'src/Components/ui/button';
import { Label } from 'src/Components/ui/label';
import { SearchComponent } from '../components/SearchComponent';
import { JoinOrganizationDialog } from './JoinOrganizationDialog';
import { dataBaseOrganization } from 'src/Interfaces/IDatabase';
import { IOrgLean } from 'src/Interfaces/IContexts';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from 'src/Components/ui/card';
import { Input } from 'src/Components/ui/input';
import { X } from 'lucide-react';
import { useState } from 'react';

type AddWorkspaceModalProps = {
    closeModal: () => void;
    allOrganizations: IOrgLean[];
    fetchAllOrganizations: () => Promise<void>;
    setUserOrganizations: (organizations: any) => void;
    handleCreateWorkspace: (workspace: any, closeModal: () => void) => void;
};

export const CreateOrganizationDialog = ({
    closeModal,
    allOrganizations,
    setUserOrganizations,
    handleCreateWorkspace,
}: AddWorkspaceModalProps) => {
    const [searchValue, setSearchValue] = useState<string>('');

    const [workspaceData, setWorkspaceData] = useState<{
        name: string;
        password: string;
    }>({
        name: '',
        password: '',
    });

    return (
        <Tabs defaultValue='create' className='w-[400px] justify-center'>
            <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='join'>Join</TabsTrigger>
                <TabsTrigger value='create'>Create</TabsTrigger>
            </TabsList>
            <TabsContent value='join'>
                <Card>
                    <CardHeader>
                        <CardTitle className=' relative on:hover cursor-pointer '>
                            Join Workspace{' '}
                            <X
                                className=' absolute right-0 top-0 on:hover cursor-pointer '
                                onClick={closeModal}
                            ></X>
                        </CardTitle>
                        <CardDescription>
                            Choose the organization you want to join. You can
                            scroll to see all.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                        <SearchComponent setSearchValue={setSearchValue}/>

                        <div className=' h-40 w-[50%] overflow-y-auto no-scrollbar mx-auto'>
                            {allOrganizations!.map(
                                (org: dataBaseOrganization) => (
                                    <JoinOrganizationDialog
                                        orgName={org.name}
                                        orgId={org._id}
                                        key={org._id}
                                        setUserOrganizations={
                                            setUserOrganizations
                                        }
                                        closeModal={closeModal}
                                    ></JoinOrganizationDialog>
                                )
                            ).filter((org) => org.props.orgName.toLowerCase().includes(searchValue.toLowerCase()))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value='create'>
                <Card>
                    <CardHeader>
                        <CardTitle className=' relative'>
                            Create Workspace{' '}
                            <X
                                className=' absolute right-0 top-0 on:hover cursor-pointer '
                                onClick={closeModal}
                            ></X>
                        </CardTitle>
                        <CardDescription>
                            Choose your workspace details. Click create when
                            you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                        <div className='space-y-1'>
                            <Label htmlFor='name'>Workspace name</Label>
                            <Input
                                id='name'
                                value={workspaceData.name}
                                onChange={(e) => {
                                    setWorkspaceData((prevData) => ({
                                        ...prevData,
                                        name: e.target.value,
                                    }));
                                }}
                            />
                        </div>
                        <div className='space-y-1'>
                            <Label htmlFor='password'>Workspace password</Label>
                            <Input
                                id='password'
                                type='password'
                                value={workspaceData.password}
                                onChange={(e) => {
                                    setWorkspaceData((prevData) => ({
                                        ...prevData,
                                        password: e.target.value,
                                    }));
                                }}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant={'primary'}
                            onClick={() =>{
                                handleCreateWorkspace(workspaceData, closeModal)
                                closeModal()
                            }
                            }
                        >
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
};
