import { Sparkles, X } from 'lucide-react';
import { FormInput } from './form-input';
import { FormSubmit } from './form-submit';
import { Button } from '../ui/button';
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from './popover';
import { FormPicker } from './form-picker';
import { useContext, useState } from 'react';
import { createAiTemplatedBoard, createBoard, createBoardFromTemplate } from '../../api/requests';
import { DashboardContext } from '../../Pages/Dashboard/contexts/DashboardContextProvider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../Toaster/use-toast';
import { TemplatePicker } from './form-templatePicker';

interface FormPopoverProps {
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side = 'right',
    align,
    sideOffset = 0,
}: FormPopoverProps) => {
    const context = useContext(DashboardContext);
    const { toast } = useToast();
    if (!context) {
        throw new Error('Dashboard context is not available');
    }
    const { selectedOrganization } = context;
    

    const navigate = useNavigate();

    const [image, setSelectedImage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
        null
    );
    const [isSelectingTemplate, setIsSelectingTemplate] =
        useState<boolean>(false);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleFormSubmit = async () => {
        try {
            if (isSelectingTemplate && selectedTemplate) {
                const result = await createBoardFromTemplate(
                    title,
                    selectedTemplate,
                    selectedOrganization!._id,
                    image!
                );
                navigate(`/board/${result._id}`);
            } else {
                const result = await createBoard({
                    name: title,
                    backgroundUrl: image!,
                    orgId: selectedOrganization!._id,
                });
                navigate(`/board/${result._id}`);
            }
        } catch (error: any) {
            toast({
                title: 'Failed to create board',
                description: error.message,
                variant: 'destructive',
            });
        }
    };
    const handleAIGeneratedBoard = async () => {
        try {
            if (!title) {
                toast({
                    title: 'Failed to create board',
                    description: 'Title is required',
                    variant: 'destructive',
                });
                return;
            }
            const result = await createAiTemplatedBoard(
                title,
                image!,
                selectedOrganization!._id,
            );
            navigate(`/board/${result._id}`);
        } catch (error: any) {
            toast({
                title: 'Failed to create board',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    return (
        <div className='mt-40'>
            <Popover>
                <PopoverTrigger asChild>{children}</PopoverTrigger>
                <PopoverContent
                    align={align}
                    className='w-80 pt-3 bg-slate-200'
                    side={side}
                    sideOffset={sideOffset}
                >
                    <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                        Create board
                    </div>
                    <PopoverClose asChild>
                        <Button
                            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
                            variant='ghost'
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </PopoverClose>
                    <form
                        onSubmit={async (e: any) => {
                            e.preventDefault();
                            await handleFormSubmit();
                        }}
                        className='space-y-4'
                    >
                        <div className='space-y-4'>
                            <FormPicker
                                id='image'
                                setSelectedImage={setSelectedImage}
                            />

                            <div className='flex flex-row justify-between gap-4 items-center w-full'>
                                <FormInput
                                    id='title'
                                    label='Board title'
                                    type='text'
                                    className='w-full'
                                    onChange={handleTitleChange}
                                />

                                <Button
                                    size='icon'
                                    onClick={(e: any) =>{
                                        e.preventDefault();
                                        handleAIGeneratedBoard();
                                    }}
                                >
                                    <div className='w-full flex justify-center items-center'>
                                        <Sparkles />
                                    </div>
                                </Button>

                                {/*                              <Label className="w-full">Generate AI template</Label> */}
                            </div>
                        </div>

                        <div>
                            <div className='pb-4'>
                                {isSelectingTemplate && (
                                    <TemplatePicker
                                        id='template'
                                        templates={
                                            selectedOrganization!.boardTemplates
                                        }
                                        setSelectedTemplate={
                                            setSelectedTemplate
                                        }
                                    />
                                )}
                            </div>
                            <Button
                                className='w-full'
                                variant='secondary'
                                onClick={() =>
                                    setIsSelectingTemplate(!isSelectingTemplate)
                                }
                                type='button'
                            >
                                {isSelectingTemplate
                                    ? 'Close templates'
                                    : 'Use template'}
                            </Button>
                        </div>

                        <FormSubmit className='w-full'>Create</FormSubmit>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    );
};
