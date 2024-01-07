import { Plus } from 'lucide-react';
import { useContext } from 'react';
import { BoardContext } from '../../context/BoardContext';
import { createList } from '../../../../api/requests';

export const AddListPlaceholder = (): JSX.Element => {
    const context = useContext(BoardContext);

    const { boardId, setLists } = context!;

    const createListFunc = async () => {
        const newList = await createList(boardId!, 'New List');
        setLists((prev) => {
            if (!prev) return [newList];
            return [...prev, newList];
        });
    };

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
