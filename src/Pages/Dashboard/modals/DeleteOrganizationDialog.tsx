import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../Components/ui/dialog';
import { Button } from '../../../Components/ui/button';
import { Label } from '../../../Components/ui/label';
import { Input } from '../../../Components/ui/input';
import { useContext, useState } from 'react';
import { deleteOrganization, joinOrganization } from '../../../api/requests';
import { useToast } from 'src/Components/Toaster/use-toast';
import { IOrg } from 'src/Interfaces/IContexts';
import { DashboardContext } from '../contexts/DashboardContextProvider';
import { useNavigate } from 'react-router-dom';

export function DeleteOrganizationDialog() {
    const { toast } = useToast();
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('Dashboard context is not available');
    }
    const { selectedOrganization, setUserOrganizations, setAllOrganizations } =
        context;

    async function handleFormSubmit() {
        setLoading(true);
        try {
            await deleteOrganization(selectedOrganization!._id, password);
            setUserOrganizations((prev: any) =>
                prev.filter((org: IOrg) => org._id !== selectedOrganization!._id)
            );
            setAllOrganizations((prev: any) =>
                prev.filter((org: IOrg) => org._id !== selectedOrganization!._id)
            );

            toast({
                title:
                    'Organization ' +
                    selectedOrganization?.name +
                    ' deleted successfully',
            });
            navigate('/dashboard');
        } catch (e: any) {
            toast({
                title: 'Error',
                description: e.message,
                variant: 'destructive',
            });
        }
        setLoading(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'destructive'} disabled={loading}>
                    Delete organization
                </Button>
            </DialogTrigger>
            <DialogContent
                className='sm:max-w-[425px] bg-slate-200'
                onSubmit={handleFormSubmit}
            >
                <DialogHeader>
                    <DialogTitle>Delete Organization</DialogTitle>
                    <DialogDescription>
                        Enter the password to the organization to verify your
                        decision.
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='password' className='text-right'>
                            Password
                        </Label>
                        <Input
                            id='password'
                            className='col-span-3'
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className='sm:justify-center'>
                    <DialogClose asChild>
                        <Button
                            type='submit'
                            className='color-black'
                            variant={'primary'}
                            onClick={handleFormSubmit}
                        >
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
