import { Link } from 'react-router-dom';

type Props = {
    action: string;
    user: string
    board: string;
    timeStamp: string;
};

export const Activity = (props: Props) => {
    const formattedDate = new Date(props.timeStamp).toLocaleString();
    console.log(props.user);
    
    return (
        <div className='border-gray-200 dark:border-gray-700 flex flex-row items-center'>
            <div className='w-[4%]'>
                <div className='w-[70%] aspect-square bg-purple-800 rounded-full flex flex-row justify-center items-center text-center'>
                    <p className='text-white'>
                    {typeof props.user === 'string' && props.user.length > 0 ? props.user[0] : 'A'}
                    </p>
                </div>
            </div>

            <div>
                <div>
                    <p>
                        <span className='font-bold'>
                            {props?.user || 'unknown'}
                        </span>{' '}
                        <Link to={`/board/${props.board}`} className=' hover:underline'>
                        {props.action}</Link>
                    </p>
                </div>

                <div>
                    <p className='text-sm'>{formattedDate}</p>
                </div>
            </div>
        </div>
    );
};
