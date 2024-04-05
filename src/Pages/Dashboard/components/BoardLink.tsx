import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const BoardLink = (board: any) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.onload = () => setIsLoading(false);
        img.src = board.backgroundUrl;
    }, [board.backgroundUrl]);

    return (
        <Link
            to={`/board/${board._id}`}
            key={board._id}
            className='group relative aspect-video rounded-sm h-full w-full p-2 overflow-hidden'
            style={{
                backgroundImage: isLoading
                    ? 'none'
                    : `url(${board.backgroundUrl})`,
                backgroundColor: isLoading ? '#cbd5e1' : 'transparent', // Temporary background color while loading
            }}
        >
            {isLoading ? (
                <div className='flex justify-center items-center h-full'>
                    <div className='spinner'>Loading...</div>{' '}
                    {/* Style this spinner */}
                </div>
            ) : (
                <>
                    <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
                    <p className='relative font-semibold text-white'>
                        {board.name}
                    </p>
                </>
            )}
        </Link>
    );
};
