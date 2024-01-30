import { X } from "lucide-react";
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
        <div className="flex flex-row w-full border-4 border-blue-50 bg-gray-50 rounded-lg p-[2%] pr-[4%] items-center justify-between">
            <div className="flex flex-col w-[70%]">
                <h1>{name}</h1>
                <p>by: {owner.username}</p>
            </div>

            <div
                className="p-1 bg-red-600 rounded hover:bg-red-700 duration-200 ease-in"
                onClick={leaveOrganistaionHandler}
            >
                <X className="text-neutral-300" />
            </div>
        </div>
    );
};
