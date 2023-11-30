import { FormEvent, useState } from 'react';
import { Button } from '../../../Components/ui/button';
import { Plus, X } from 'lucide-react';
import { FormTextArea } from '../../../Components/ui/form/form-textarea';
import { FormSubmit } from '../../../Components/ui/form/form-submit';
import { useEventListener } from 'usehooks-ts';
import { useParams } from 'react-router-dom';

interface CardFormProps {
    listId: string;
}

export const CardForm = ({ listId }: CardFormProps) => {
    const { boardId } = useParams<{ boardId: string }>();
    const [isEditing, setIsEditing] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const listId = formData.get('listId') as string;
        setIsEditing(!isEditing);
        formData.set('title', '');
        console.log(title, listId, boardId);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsEditing(false);
        }
    };
    useEventListener('keydown', onKeyDown);

    if (isEditing) {
        return (
            <form onSubmit={onSubmit} className="m-1 py-0.5 px-1 space-y-4">
                <FormTextArea
                    id="title"
                    placeholder="Enter a title for this card..."
                />
                <input
                    hidden
                    id="listId"
                    name="listId"
                    value={listId}
                    onChange={() => {}}
                />
                <div className="flex items-center gap-x-1">
                    <FormSubmit>Add card</FormSubmit>
                    <Button
                        onClick={() => setIsEditing(!isEditing)}
                        size="sm"
                        variant="ghost"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </form>
        );
    }

    return (
        <div className="pt-2 px-2">
            <Button
                onClick={() => setIsEditing(!isEditing)}
                className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
                size="sm"
                variant="ghost"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add a card
            </Button>
        </div>
    );
};
