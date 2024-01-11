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
import { DropdownMenuItem } from 'src/Components/dropdown';
import { Settings } from 'lucide-react';
import { FormPicker } from 'src/Components/form/form-picker';
import { useState } from 'react';
import { changeBoardBackground } from 'src/api/requests';
import { toast } from 'src/Components/Toaster/use-toast';

export function BackgroundPicker({boardId, setBackgroundUrl}: {boardId : string, setBackgroundUrl: (bgUrl: string) => void}) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    
    const handleSubmit = async(e: any) => {
        if(!selectedImage){
            e.preventDefault()
            toast({
                title: 'Failed to change background',
                description: "You did not select a background"
            })
            return
        }
        setBackgroundUrl(selectedImage)
        changeBoardBackground(boardId, selectedImage)
        toast({
            title: 'Background changed',
            description: "Background changed sucessfuly"
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Settings className='mr-2 h-4 w-4' />
                    <span>Change background</span>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] bg-slate-200'>
                <DialogHeader>
                    <DialogTitle>Choose background</DialogTitle>
                    <DialogDescription>
                        Choose your new background from the ones below
                    </DialogDescription>
                </DialogHeader>
                <FormPicker
                    id='image'
                    setSelectedImage={setSelectedImage}
                ></FormPicker>
                <DialogFooter className='sm:justify-center'>
                    <DialogClose asChild>
                        <Button
                            type='submit'
                            size={'lg'}
                            className='color-black'
                            variant={'primary'}
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
