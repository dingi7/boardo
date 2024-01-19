import { Navbar } from 'src/Components/navbar';
import { Skeleton } from 'src/Components/ui/skeleton';

export const BoardSkeleton = () => {
    // const array = new Array(8).fill(Map(0, 8, (i) => i)));
    const array = Array.from(Array(8).keys());

    return (
        <>
            <div className='flex flex-row gap-[2%] items-center'>
                <Skeleton className='p-[2%] w-[20%] sm:w-[15%] md:w-[10%] lg:w-[8%] xl:w-[6%] aspect-square text-black flex justify-center items-center rounded bg-gradient-to-r from-purple-500 to-indigo-600'>
                    <Skeleton className='w-full h-full' />
                </Skeleton>

                <div>
                    <Skeleton className='font-extrabold text-2xl w-[200px] h-8' />
                </div>
            </div>
            <div className='mt-[4%] w-full'>
                <div className='flex flex-row gap-[1%] font-medium text-xl'>
                    <Skeleton className='w-8 h-8' />
                    <Skeleton className=' w-full h-8' />
                </div>

                <Skeleton className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-[2%]'>
                    {array.map((index) => (
                        
                        <Skeleton
                            key={index + Math.random() * 1000}
                            className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-slate-300 rounded-sm h-[150px] w-full p-2 overflow-hidden'
                        >
                            <Skeleton className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
                            <Skeleton className='relative font-semibold text-white' />
                        </Skeleton>
                    ))}
                </Skeleton>
            </div>
        </>
    );
};
