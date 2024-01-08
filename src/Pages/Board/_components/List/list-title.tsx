import { FormInput } from '../../../../Components/form/form-input';
import { Button } from '../../../../Components/ui/button';
import { useState } from 'react';

export const ListTitle = ({ title, setTitle }: any): JSX.Element => {
    const [isEditing, setIsEditing] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        // send db rec
        setIsEditing(false);
    };

    const onBlur = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <form onSubmit={onSubmit} className='flex items-center gap-x-2'>
                <FormInput
                    id='title'
                    onBlur={onBlur}
                    defaultValue={title}
                    className="text-lg h-auto w-auto py-1 px-2 text-[24px] text-slate-700 font-medium bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                />
            </form>
        );
    }

    return (
        <Button
            onClick={() => setIsEditing(true)}
            variant='transparent'
            className="font-medium text-lg h-auto w-auto py-1` px-2 text-slate-900 text-[24px]"
        >
            {title}
        </Button>
    );
};
