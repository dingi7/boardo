import { CalendarCheck2 } from 'lucide-react';
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
export const AssignForCompleted = ({
    itemId,

    setLists,
    deleteCard,
}: {
    itemId: string;
    setLists: (lists: any) => void;
    deleteCard?: (cardId: string) => void;
}): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleAssigning = async () => {
        //setLoading(true);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    disabled={loading}
                    className='cursor-pointer'
                >
                    <CalendarCheck2 className='mr-2 h-4 w-4' />
                    <span>Assign list "Done"</span>
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Mark the cards put into this list as completed
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAssigning}>
                        Assign "Done"
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
