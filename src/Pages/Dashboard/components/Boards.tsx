import { Building2, User2 } from 'lucide-react';
import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { AddBoard } from './AddBoard';
import { BoardLink } from './BoardLink';

type Props = {};

export const Boards = (props: Props) => {
    const context = useOutletContext<any>();
    const { selectedOrganization, boards } = context;

    return (
        <>
            <div className='flex flex-row gap-[2%] items-center'>
                <div className='p-[2%] w-[20%] sm:w-[15%] md:w-[10%] lg:w-[8%] xl:w-[6%] aspect-square text-black flex justify-center items-center rounded bg-gradient-to-r from-purple-500 to-indigo-600'>
                    <Building2 color='white' className='w-[100%]' />
                </div>

                <p className='font-extrabold text-2xl'>
                    {selectedOrganization.name || 'Loading...'}
                </p>
            </div>

            <div className='mt-[4%] w-full'>
                <h1 className='flex flex-row gap-[1%] font-medium text-xl'>
                    <User2 size={30} /> Your boards
                </h1>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-[2%]'>
                    {boards!.map((board: any) => (
                        <BoardLink board={board} key={board._id} />
                    ))}
                    <AddBoard remainingBoards={5 - boards!.length} />
                </div>
            </div>
        </>
    );
};
