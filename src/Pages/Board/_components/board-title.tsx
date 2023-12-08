import { FormInput } from '../../../Components/form/form-input';
import { Button } from '../../../Components/ui/button';
import { useState } from 'react';

export const BoardTitle = ({ boardName, setBoardName }: any): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        // send db rec
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
