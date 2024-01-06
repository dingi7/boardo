import { Plus } from 'lucide-react';
import { Dispatch, SetStateAction, useContext } from 'react';
import { dataBaseList } from '../../../Interfaces/IDatabase';
import { BoardContext } from '../BoardContext';
import { createList } from '../../../api/requests';

type AddListPlaceholderProps = {
    setLists: Dispatch<SetStateAction<dataBaseList[] | null>>;
};

export const AddListPlaceholder = ({
    setLists,
}: AddListPlaceholderProps): JSX.Element => {
    const context = useContext(BoardContext);

    const {boardId} = context!;

    const createListFunc = async () => {
        const newList = await createList(boardId!, 'New List');
        setLists((prev) => {
            if (!prev) return [newList];
            return [...prev, newList];
        });
    }

    return (
        <div
            className='inline-flex flex-col items-start gap-[10px] on:hover: cursor-pointer'
            key={'add list'}
            onClick={() => createListFunc()}
            
        >
            <div className=' bg-slate-300 rounded-[7px] shadow-lg '>
                <div className='p-5'>
                    <div className='inline-flex flex-col items-start gap-[5px] '>
                        <div className='inline-flex flex-row items-start gap-[13px] relative flex-[0_0_auto] min-w-[200px] '>
                            {' '}
                            <Plus />
                            Add list
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
