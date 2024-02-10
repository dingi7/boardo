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
import { deleteBoard, deleteList } from 'src/api/requests';

export const DeleteHandler = ({
    itemId,
    option,
    setLists,
    deleteCard
}: {
    itemId: string;
    option: 'board' | 'list' | 'card';
    setLists?: (lists: any) => void;
    deleteCard?: (cardId: string) => void;
}): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleDeletion = async () => {
        setLoading(true);
        if (option === 'board') {
            await deleteBoard(itemId);
            navigate('/dashboard');
            toast({
                title: 'Board sucessfuly deleted',
            });
        }
        if (option === 'list') {
            setLists!((prev: any) =>
                prev.filter((list: any) => list._id !== itemId)
            )
            try {
                await deleteList(itemId);
                toast({
                    title: 'List sucessfuly deleted',
                });
            } catch (e) {
                toast({
                    title: 'List could not be deleted',
                    variant: "destructive" 
                });
            }
        }
        if (option === 'card') {
            try{
            deleteCard!(itemId);
            toast({
                title: 'Card deleted successfully',
            });
            }catch(e){
                toast({
                    title: 'Card could not be deleted',
                    variant: "destructive" 
                });
            }
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    disabled={loading}
                    className="cursor-pointer"
                >
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
                        delete this item and remove the data from our servers.
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
