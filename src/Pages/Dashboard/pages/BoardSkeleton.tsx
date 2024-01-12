import { Skeleton } from "src/Components/ui/skeleton"

export const BoardSkeleton = () => {
    return (
        <>
            <div className='flex flex-row gap-[2%] items-center'>
                <Skeleton className='p-[2%] w-[20%] sm:w-[15%] md:w-[10%] lg:w-[8%] xl:w-[6%] aspect-square text-black flex justify-center items-center rounded bg-gradient-to-r from-purple-500 to-indigo-600'>
                    <Skeleton color='white' className='w-[100%]' />
                </Skeleton>
                <div>
                <Skeleton className='font-extrabold text-2xl'>
                </Skeleton></div>
            </div>

            <div className='mt-[4%] w-full'>
                <Skeleton className='flex flex-row gap-[1%] font-medium text-xl'>
                    <Skeleton />
                </Skeleton>
                <Skeleton className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-[2%]'>

                    <div
                        className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden'
                    >
                        <Skeleton className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
                        <Skeleton className='relative font-semibold text-white'>

                        </Skeleton>
                    </div>

                </Skeleton>
            </div>
        </>
    )
}