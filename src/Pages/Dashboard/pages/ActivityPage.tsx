import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Activity } from '../components/Activity';

type Props = {};

export const ActivityPage = (props: Props) => {
    const { selectedOrganization } = useOutletContext<any>();

    return (
        <div className='mb-4 border-gray-200 dark:border-gray-700 flex flex-col gap-[1rem]'>
            <h1 className='text-lg font-bold'>Activity</h1>
            <div className='flex flex-col gap-[1rem]'>
                {selectedOrganization.activity.map((activity: any) => (
                    <Activity
                        key={activity._id}
                        action={activity.action}
                        user={activity.user}
                        board={activity.board}
                        timeStamp={activity.timeStamp}
                    />
                ))}
            </div>
        </div>
    );
};
