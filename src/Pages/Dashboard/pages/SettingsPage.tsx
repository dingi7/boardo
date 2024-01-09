import React from "react";
import { useAuthUser } from "react-auth-kit";
import { useOutletContext } from "react-router-dom";
import { Button } from "src/Components/ui/button";

type Props = {};

export const Settings = (props: Props) => {
    const { selectedOrganization } = useOutletContext<any>();
    const auth = useAuthUser()();
    const isAuthenticated = auth && auth._id === selectedOrganization.owner;
    return (
        <div className="flex justify-between">
            <div className="flex flex-col items-left">
                <h1 className="font-semibold text-lg">
                    {isAuthenticated
                        ? "Authorized as Owner"
                        : "Authorized as Member"}
                </h1>

                {selectedOrganization.members.map(
                    (name: string, index: number) => (
                        <div
                            key={index}
                            className="bg-gray-200 p-2 m-2 rounded"
                        >
                            {name}
                        </div>
                    )
                )}
            </div>
            {isAuthenticated && (
                <div className="flex flex-col items-left">
                    <h1 className="font-semibold text-lg">
                        Organization Settings
                    </h1>
                    <div className="flex bg-gray-200 p-2 m-2 rounded justify-between items-center gap-3">
                        <Button>Edit organization</Button>
                        <Button>Delete organization</Button>
                    </div>
                    <h1 className="font-semibold text-lg">
                        Memebers Settings
                    </h1>
                    <div className="flex bg-gray-200 p-2 m-2 rounded justify-between gap-3">
                        <Button>Invite members</Button>
                        <Button>Remove members</Button>
                    </div>
                </div>
            )}
        </div>
    );
};
