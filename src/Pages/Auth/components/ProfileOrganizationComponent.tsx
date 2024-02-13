import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "src/Components/alertDialog";
import { Button } from "src/Components/ui/button";
import { IUserData } from "src/Interfaces/IUserData";

export const ProfileOrganizationComponent = ({
    name,
    owner,
    orgId,
    userId,
    leaveOrgFunc,
}: {
    name: string;
    owner: IUserData;
    orgId: string;
    userId: string;
    leaveOrgFunc: (orgId: string) => void;
}) => {
    const leaveOrganistaionHandler = async () => {
        leaveOrgFunc(orgId)
    };
    return (
        <div
            key={orgId}
            className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-2 rounded-md"
        >
            <div className="flex flex-col ">
                <span className="font-semibold">{name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    Owner: {owner.username}
                </span>
            </div>

            <AlertDialog>
                <AlertDialogTrigger>
                    <Button
                        size="sm"
                        variant="destructive"
                    >
                        Leave
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your organization or remove you from it.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={leaveOrganistaionHandler}>Leave</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
