import { useState } from 'react';

export const BoardPlaceholder = ({
    name,
    img,
}: {
    name: string;
    img: string;
}) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            {img ? (
                <div
                    className='w-[30%] h-[100%] relative mt-2 rounded overflow-hidden bg-gradient-to-r from-slate-600 to-slate-900 text-white'
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <img
                        src={img}
                        alt='board display'
                        className='w-full h-full object-cover duration-500 ease-in-out hover:blur '
                        draggable={false}
                    />

                    {isHovering && (
                        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold select-none pointer-events-none text-white'>
                            {name}
                        </p>
                    )}
                </div>
            ) : (
                <div className='w-30 h-40 mt-2 rounded bg-gradient-to-r from-slate-600 to-slate-900 text-white relative'>
                    {isHovering && (
                        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold select-none pointer-events-none text-white'>
                            {name}
                        </p>
                    )}
                </div>
            )}
        </>
    );
};
