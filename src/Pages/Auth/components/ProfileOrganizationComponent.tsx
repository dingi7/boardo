import { Button } from "src/Components/ui/button";
import { IUserData } from "src/Interfaces/IUserData";

export const ProfileOrganizationComponent = ({
    name,
    owner,
}: {
    name: string;
    owner: IUserData;
}) => {
    const leaveOrganistaionHandler = () => {
        if (
            window.confirm(
                `Are you sure that you want to leave "${name}" \nby: ${owner.username}?`
            )
        ) {
            
        }
    };
    return (
        <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-2 rounded-md">
            <div className="flex flex-col ">
                <span className="font-semibold">{name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    Owner: {owner.username}
                </span>
            </div>
            <Button size="sm" variant="destructive" onClick={leaveOrganistaionHandler}>
                Leave
            </Button>
        </div>
    );
};
