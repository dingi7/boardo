import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProfileAssignmentComponent = ({
    cardName,
    boardId,
    dueTo,
}: {
    cardName: string;
    boardId: string;
    dueTo: Date;
}) => {
    const dueDate = (dueTo && new Date(dueTo)) || null;

    return (
        <div
            key={boardId}
            className='flex items-center justify-between bg-gray-200 p-2 rounded-md'
        >
            <div className='flex flex-col '>
                <span className='font-semibold'>{cardName}</span>
                <span className='text-xs text-gray-500 dark:text-gray-400 ml-2'>
                    Due to:{' '}
                    {(dueDate && dueDate.toLocaleDateString()) || 'No due date'}
                </span>
            </div>

            <Link to={`/board/${boardId}`} className='mr-2 hover:underline'>
                <p className='flex gap-1'>
                    <span>Go to card</span>
                    <ArrowRight />
                </p>
            </Link>
        </div>
    );
};
