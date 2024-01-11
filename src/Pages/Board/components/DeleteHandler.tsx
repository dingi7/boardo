import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'src/Components/Toaster/use-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from 'src/Components/alertDialog';
import { DropdownMenuItem } from 'src/Components/dropdown';
import { deleteBoard } from 'src/api/requests';

export const DeleteHandler = ({
    boardId,
}: {
    boardId: string;
}): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()
    const handleDeletion = async () => {
        setLoading(true)
        await deleteBoard(boardId);
        navigate('/dashboard')
        toast({
            title: 'Board sucessfuly deleted',
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} disabled={loading}>
                    <Trash className='mr-2 h-4 w-4' />
                    <span>Delete</span>
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your board and remove the data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeletion}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
