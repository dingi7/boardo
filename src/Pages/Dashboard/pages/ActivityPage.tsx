import { useContext } from 'react';
import { Activity } from '../components/Activity';
import { DashboardContext } from '../contexts/DashboardContextProvider';

type Props = {};

export const ActivityPage = (props: Props) => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('Dashboard context is not available');
    }
    const { selectedOrganization } = context;
    const activity = selectedOrganization!.activity.slice().reverse();

    return (
        <div className='mb-4 border-gray-200 dark:border-gray-700 flex flex-col gap-[1rem]'>
            <h1 className='text-lg font-bold'>Activity</h1>
            <div className='flex flex-col gap-[1rem]'>
                {activity.map((activity: any) => (
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
