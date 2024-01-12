import React from "react";
import { useAuthUser } from "react-auth-kit";
import { useOutletContext } from "react-router-dom";
import { Button } from "src/Components/ui/button";
import { Input } from "src/Components/ui/input";

type Props = {};

export const Settings = (props: Props) => {
    const { selectedOrganization } = useOutletContext<any>();
    const auth = useAuthUser()();
    const isAuthenticated = auth && auth._id === selectedOrganization.owner;
    return (
        <div className="flex flex-col justify-between">
            <div className="flex flex-col items-left">
                <h1 className="font-semibold text-lg">
                    {isAuthenticated
                        ? "Authorized as Owner"
                        : "Authorized as Member"}
                </h1>

                {/* {selectedOrganization.members.map(
                    (name: string, index: number) => (
                        <div
                            key={index}
                            className="bg-gray-200 p-2 m-2 rounded"
                        >
                            {name}
                        </div>
                    )
                )} */}
            </div>
            {isAuthenticated && (
                // <div className="flex flex-col items-left">
                //     <h1 className="font-semibold text-lg">
                //         Organization Settings
                //     </h1>
                //     <div className="flex bg-gray-200 p-2 m-2 rounded justify-between items-center gap-3">
                //         <Button>Edit organization</Button>
                //         <Button>Delete organization</Button>
                //     </div>
                //     <h1 className="font-semibold text-lg">
                //         Memebers Settings
                //     </h1>
                //     <div className="flex bg-gray-200 p-2 m-2 rounded justify-between gap-3">
                //         <Button>Invite members</Button>
                //         <Button>Remove members</Button>
                //     </div>
                // </div>

                <div className="flex flex-col items-left">
                    <section className="flex flex-col gap-[1rem] mt-[4%]">
                        <h2 className="font-bold text-[24px]">
                            General settings
                        </h2>

                        <div className="flex flex-col gap-[0.2rem]">
                            <label htmlFor="org-name">Organisation name:</label>
                            <Input
                                name="org-name"
                                value={selectedOrganization.name}
                            />
                        </div>
                    </section>

                    <section className="flex flex-col gap-[1rem] mt-[4%]">
                        <h2 className="font-bold text-[24px]">
                            Privacy settings
                        </h2>

                        <div className="flex flex-col gap-[0.2rem]">
                            <label htmlFor="org-name">Authorized users:</label>
                            <ul className="list-none">
                                {selectedOrganization.members.filter(
                                    (member: any) =>
                                        member._id ===
                                        selectedOrganization.owner
                                ).length > 0 ? (
                                    selectedOrganization.members
                                        .filter(
                                            (member: any) =>
                                                member._id ===
                                                selectedOrganization.owner
                                        )
                                        .map((name: string, index: number) => (
                                            <li
                                                key={index}
                                                className="bg-gray-200 p-2 m-2 rounded"
                                            >
                                                {name}
                                            </li>
                                        ))
                                ) : (
                                    <li className="font-bold">No members yet!</li>
                                )}
                            </ul>
                        </div>

                        <div>
                            <Button variant="gray">Change password</Button>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};
