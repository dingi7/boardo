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
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Button } from '../../../Components/ui/button';
import { Label } from '../../../Components/ui/label';
import { Input } from '../../../Components/ui/input';
import { DropdownMenuItem } from 'src/Components/dropdown';
import { Settings } from 'lucide-react';

export function BackgroundPicker({}: {}) {
    return (
        // <div className="h-[50%] w-[40%] overflow-y-auto no-scrollbar mx-auto">

        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem>
                    <Settings className='mr-2 h-4 w-4' />
                    <span>Change background</span>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent
                className='sm:max-w-[425px] bg-slate-200'
                // onSubmit={handleFormSubmit}
            >
                <DialogHeader>
                    <DialogTitle>Join Organization</DialogTitle>
                    <DialogDescription>
                        Enter the password to the organization. Click join when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                            Name
                        </Label>
                        <Input
                            id='name'
                            // defaultValue={orgName}
                            className='col-span-3'
                            disabled={true}
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='password' className='text-right'>
                            Password
                        </Label>
                        <Input
                            id='password'
                            className='col-span-3'
                            // onChange={(e: any) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className='sm:justify-center'>
                    <DialogClose asChild>
                        <Button
                            type='submit'
                            className='color-black'
                            variant={'primary'}
                            // onClick={handleFormSubmit}
                        >
                            Join
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        // </div>
    );
}
