import React, { useContext } from 'react';
import { Building2, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AddBoard } from '../components/AddBoard';
import { BoardSkeleton } from '../skeletons/BoardSkeleton';
import { DashboardContext } from '../contexts/DashboardContextProvider';

export const BoardsPage = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('Dashboard context is not available');
    }
    const { selectedOrganization, boards, fetching } = context;
    
    if (fetching) {
        return <BoardSkeleton />;
    }
    return (
        <div>
            {selectedOrganization !== null ? (
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
                                <Link
                                    to={`/board/${board._id}`}
                                    key={board._id}
                                    className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden'
                                    style={{
                                        backgroundImage: `url(${board.backgroundUrl})`,
                                    }}
                                >
                                    <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
                                    <p className='relative font-semibold text-white'>
                                        {board.name}
                                    </p>
                                </Link>
                            ))}
                            <AddBoard remainingBoards={5 - boards!.length} />
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};
