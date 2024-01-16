import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link, useOutletContext } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/Components/tabs";
import { Button } from "src/Components/ui/button";

type Props = {};

export const Settings = (props: Props) => {
    const { selectedOrganization } = useOutletContext<any>();
    const auth = useAuthUser()();
    const isAuthenticated = auth && auth._id === selectedOrganization.owner;

    const [activeTab, setActiveTab] = useState("profile");

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };
    return (
        // <div className="flex flex-col justify-between">
        //     <div className="flex flex-col items-left">
        //         <h1 className="font-semibold text-lg">
        //             {isAuthenticated
        //                 ? "Authorized as Owner"
        //                 : "Authorized as Member"}
        //         </h1>

        //         {/* {selectedOrganization.members.map(
        //             (name: string, index: number) => (
        //                 <div
        //                     key={index}
        //                     className="bg-gray-200 p-2 m-2 rounded"
        //                 >
        //                     {name}
        //                 </div>
        //             )
        //         )} */}
        //     </div>
        //     {isAuthenticated && (
        //         // <div className="flex flex-col items-left">
        //         //     <h1 className="font-semibold text-lg">
        //         //         Organization Settings
        //         //     </h1>
        //         //     <div className="flex bg-gray-200 p-2 m-2 rounded justify-between items-center gap-3">
        //         //         <Button>Edit organization</Button>
        //         //         <Button>Delete organization</Button>
        //         //     </div>
        //         //     <h1 className="font-semibold text-lg">
        //         //         Memebers Settings
        //         //     </h1>
        //         //     <div className="flex bg-gray-200 p-2 m-2 rounded justify-between gap-3">
        //         //         <Button>Invite members</Button>
        //         //         <Button>Remove members</Button>
        //         //     </div>
        //         // </div>

        //         <div className="flex flex-col items-left">
        //             <section className="flex flex-col gap-[1rem] mt-[4%]">
        //                 <h2 className="font-bold text-[24px]">
        //                     General settings
        //                 </h2>

        //                 <div className="flex flex-col gap-[0.2rem]">
        //                     <label htmlFor="org-name">Organisation name:</label>
        //                     <Input
        //                         name="org-name"
        //                         value={selectedOrganization.name}
        //                     />

        //                 </div>
        //                 <Button>Save</Button>
        //             </section>

        //             <section className="flex flex-col gap-[1rem] mt-[4%]">
        //                 <h2 className="font-bold text-[24px]">
        //                     Privacy settings
        //                 </h2>

        //                 <div className="flex flex-col gap-[0.2rem]">
        //                     <label htmlFor="org-name">Authorized users:</label>
        //                     <ul className="list-none">
        //                         {selectedOrganization.members.filter(
        //                             (member: any) =>
        //                                 member._id ===
        //                                 selectedOrganization.owner
        //                         ).length > 0 ? (
        //                             selectedOrganization.members
        //                                 .filter(
        //                                     (member: any) =>
        //                                         member._id ===
        //                                         selectedOrganization.owner
        //                                 )
        //                                 .map((name: string, index: number) => (
        //                                     <li
        //                                         key={index}
        //                                         className="bg-gray-200 p-2 m-2 rounded"
        //                                     >
        //                                         {name}
        //                                     </li>
        //                                 ))
        //                         ) : (
        //                             <li className="font-bold">No members yet!</li>
        //                         )}
        //                     </ul>
        //                 </div>

        //                 <div>
        //                     <Button variant="gray">Change password</Button>
        //                 </div>
        //             </section>
        //         </div>
        //     )}
        // </div>
        <div>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul
                    className="flex flex-wrap -mb-px text-sm font-medium text-center"
                    role="tablist"
                >
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                activeTab === "members"
                                    ? "border-blue-500 text-blue-500"
                                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            }`}
                            id="members-tab"
                            data-tabs-target="#members"
                            type="button"
                            role="tab"
                            aria-controls="members"
                            aria-selected={activeTab === "members"}
                            onClick={() => handleTabClick("members")}
                        >
                            Members
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                activeTab === "settings"
                                    ? "border-blue-500 text-blue-500"
                                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            }`}
                            id="settings-tab"
                            data-tabs-target="#settings"
                            type="button"
                            role="tab"
                            aria-controls="settings"
                            aria-selected={activeTab === "settings"}
                            onClick={() => handleTabClick("settings")}
                        >
                            Settings
                        </button>
                    </li>
                    {/* Repeat similar code for other tabs */}
                    {/* ... */}
                </ul>

                <div id="default-tab-content">
                    {/* Render the content based on the active tab */}
                    <div
                        className={`h-full overflow-y-auto p-6 ${
                            activeTab === "members" ? "block" : "hidden"
                        }`}
                        id="members"
                        role="tabpanel"
                        aria-labelledby="members-tab"
                    >
                        <section className="flex flex-col gap-[1rem] mt-[4%]">
                            <h2 className="font-bold text-[24px]">
                                Organisation members
                            </h2>

                            <div className="flex flex-col gap-[0.2rem]">
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
                                            .map(
                                                (
                                                    member: any,
                                                    index: number
                                                ) => (
                                                    <li
                                                        key={index}
                                                        className="bg-gray-200 p-2 m-2 rounded"
                                                    >
                                                        {`${member.firstName} ${member.lastName}`}
                                                    </li>
                                                )
                                            )
                                    ) : (
                                        <li className="font-bold">
                                            No members yet!
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </section>
                    </div>
                    <div
                        className={`h-full overflow-y-auto p-6 ${
                            activeTab === "settings" ? "block" : "hidden"
                        }`}
                        id="settings"
                        role="tabpanel"
                        aria-labelledby="settings-tab"
                    >
                        <section className="flex flex-col gap-[1rem] mt-[4%]">
                            <h2 className="font-bold text-[24px]">
                                Organisation settings
                            </h2>

                            <div className="flex flex-col gap-[0.2rem]">
                                <ul className="list-none">
                                    
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
