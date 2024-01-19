import { Navbar } from 'src/Components/navbar';
import { Skeleton } from 'src/Components/ui/skeleton';

export const DashboardSkeleton = () => {
    const array = new Array(8).fill(0);
    return (
        <div className={`h-screen duration-500 ease-in-out `}>
            <Navbar />
            <div
                className={`h-screen mt-0 flex flex-row gap-[5%] duration-500 ease-in-out`}
            >
                <div className='w-[30%] ml-[2%] h-[90%] mt-auto border-r-2 pt-[5%] md:w-[25%] lg:w-[20%] md:pt-[2%] xl:pt-[1%] 2xl:pt-0'>
                    <div className='text-sm md:text-base lg:text-text-lg pl-[2%] pt-[3%] pr-[5%] select-none'>
                        <h1 className='w-[95%] flex flex-row justify-between font-bold'>
                            <Skeleton className='w-24 h-8' />
                        </h1>
                        <div className='mt-[4%] hover:cursor-pointer'>
                            <Skeleton className='text-gray-500' />
                            {array.map((index) => (
                                <Skeleton
                                    key={index + Math.random() * 1000}
                                    className='mt-[2%]'
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className='w-[60%] p-[1%] pt-[20%] sm:pt-[15%] md:pt-[10%] xl:pt-[5%]'>
                    <div className='flex flex-col justify-center items-center h-full'>
                        <Skeleton className='font-bold text-2xl w-72 h-8' />
                        <Skeleton className='mt-[2%] bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md p-[2%] hover:cursor-pointer w-40 h-10' />
                    </div>
                </div>
            </div>
        </div>
    );
};
