import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../Components/ui/dialog';
import { Button } from '../../../Components/ui/button';
import { DropdownMenuItem } from 'src/Components/dropdown';
import { Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'src/Components/Toaster/use-toast';
import { FormInput } from 'src/Components/form/form-input';
import { saveTemplate } from 'src/api/requests';

export function SaveTemplate({ boardId }: { boardId: string }) {
    const [templateTitle, setTemplateTitle] = useState<string>('');

    const handleSubmit = async (e: any) => {
        if (!templateTitle) {
            e.preventDefault();
            toast({
                title: 'Failed to change background',
                description: 'You did not select a background',
                variant: 'destructive',
            });
            return;
        }

        toast({
            title: 'Background changed',
            description: 'Background changed sucessfuly',
            variant: 'default',
        });
    };

    const handleSaveTemplate = async () => {
        try {
            await saveTemplate(templateTitle, boardId);
            toast({
                title: 'Template saved',
                description: 'Template saved successfully',
                variant: 'default',
            });
        } catch (error) {
            toast({
                title: 'Failed to save template',
                description: 'Failed to save template',
                variant: 'destructive',
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Save className='w-4 h-4 mr-2' />
                    <span>Save board as Template</span>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] bg-slate-200'>
                <DialogHeader>
                    <DialogTitle>Save template</DialogTitle>
                </DialogHeader>
                <div>
                    <FormInput
                        id='templateName'
                        placeholder='Template name...'
                        onChange={(e) => setTemplateTitle(e.target.value)}
                        defaultValue={templateTitle}
                    />
                </div>
                <DialogFooter className='sm:justify-center'>
                    <DialogClose asChild>
                        <Button
                            type='submit'
                            size={'lg'}
                            className='color-black'
                            variant={'primary'}
                            onClick={handleSaveTemplate}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
