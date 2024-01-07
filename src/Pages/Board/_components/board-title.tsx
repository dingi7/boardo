import { FormInput } from '../../../Components/form/form-input';
import { Button } from '../../../Components/ui/button';
import { useContext, useState } from 'react';
import { BoardContext } from '../context/BoardContext';
import {  updateBoardName } from '../../../api/requests';
import { useToast } from 'src/Components/use-toast';
// import { useToast } from '@/src/Components/use-toast';

export const BoardTitle = ({ boardName, setBoardName }: any): JSX.Element => {
    const context = useContext(BoardContext)
    const {toast} = useToast()
    if (!context) {
        throw new Error('Board context is not available');
    }
    const {boardId} = context;

    const [isEditing, setIsEditing] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        updateBoardName(boardId!, title);
        toast({
            title: 'Board name updated successfully',
        })
        setBoardName(title);
        setIsEditing(false);
    };

    const onBlur = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <form onSubmit={onSubmit} className="flex items-center gap-x-2">
                <FormInput
                    id="title"
                    onBlur={onBlur}
                    defaultValue={boardName}
                    className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                />
            </form>
        );
    }

    return (
        <Button
            onClick={() => setIsEditing(true)}
            variant="transparent"
            className="font-bold text-lg h-auto w-auto p-1 px-2"
        >
            {boardName}
        </Button>
    );
};
