import { toast } from 'src/Components/Toaster/use-toast';
import { Button } from 'src/Components/ui/button';
import { IUserData } from 'src/Interfaces/IUserData';
import { leaveOrganization } from 'src/api/requests';

export const ProfileOrganizationComponent = ({
    name,
    owner,
    orgId,
    leaveOrgFunc
}: {
    name: string;
    owner: IUserData;
    orgId: string;
    leaveOrgFunc: (orgId: string) => void;
}) => {
    const leaveOrganistaionHandler = async () => {
        if (
            window.confirm(
                `Are you sure that you want to leave "${name}" \nby: ${owner.username}?`
            )
        ) {
            leaveOrgFunc(orgId);
        }
    };
    return (
        <div key={orgId} className='flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-2 rounded-md'>
            <div className='flex flex-col '>
                <span className='font-semibold'>{name}</span>
                <span className='text-xs text-gray-500 dark:text-gray-400 ml-2'>
                    Owner: {owner.username}
                </span>
            </div>
            <Button
                size='sm'
                variant='destructive'
                onClick={leaveOrganistaionHandler}
            >
                Leave
            </Button>
        </div>
    );
};
