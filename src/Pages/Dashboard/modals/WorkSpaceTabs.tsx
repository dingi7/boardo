import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/Components/tabs';
import { Button } from 'src/Components/ui/button';
import { Label } from 'src/Components/ui/label';
import { SearchComponent } from '../components/SearchComponent';
import { JoinDialog } from './JoinWorkspaceDialog';
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
import { createOrganization } from 'src/api/requests';
import { useState } from 'react';

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
    const [workspaceData, setWorkspaceData] = useState<{
        name: string;
        password: string;
    }>({
        name: '',
        password: '',
    });

    const handleCreateWorkspace = async () => {
        const result = await createOrganization(workspaceData);
        setUserOrganizations((prev: any) => [...prev, result]);
        setSelectedOrganization(result);
        closeModal();
    };

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
                        <SearchComponent />

                        <div className=' h-40 w-[50%] overflow-y-auto no-scrollbar mx-auto'>
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
                            onClick={handleCreateWorkspace}
                        >
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
};
