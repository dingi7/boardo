import React, { useState } from "react";
// import { useAuthUser } from "react-auth-kit";
import { useNavigate, useOutletContext } from "react-router-dom";
import MemberCard from "../components/MemberCard";
import { Input } from "src/Components/ui/input";
import { Button } from "src/Components/ui/button";
import { deleteOrganization } from "src/api/requests";
import { useToast } from "src/Components/Toaster/use-toast";
type Props = {};

export const Settings = (props: Props) => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { selectedOrganization, setUserOrganizations } =
        useOutletContext<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState(selectedOrganization.name);
    const [activeTab, setActiveTab] = useState("members");
    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    async function handleDeleteOrganization() {
        if (
            !window.confirm(
                "Are you sure you want to delete this organization?"
            )
        ) {
            return;
        }
        setLoading(true);
        try {
            await deleteOrganization(selectedOrganization._id);
            // remove from all organizations
            setUserOrganizations((prev: any) =>
                prev.filter((org: any) => org._id !== selectedOrganization._id)
            );
            toast({
                title: "Organization deleted successfully",
            });
            navigate("/dashboard");
        } catch (e: any) {
            console.log(e);
            toast({
                title: "Error",
                description: e.message,
                variant: "destructive",
            });
        }
        setLoading(false);

        console.log("delete");
    }

    return (
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul
                className="flex flex-wrap -mb-px text-sm font-medium text-center"
                role="tablist"
            >
                <li className="me-2 flex-grow" role="presentation">
                    <button
                        className={`inline-block w-full p-4 border-b-2 rounded-t-lg ${
                            activeTab === "members"
                                ? "border-blue-500 text-blue-500 font-semibold"
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
                        <span className="text-lg">Members</span>
                    </button>
                </li>
                <li className="me-2 flex-grow" role="presentation">
                    <button
                        className={`inline-block w-full p-4 border-b-2 rounded-t-lg ${
                            activeTab === "settings"
                                ? "border-blue-500 text-blue-500 font-semibold"
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
                        <span className="text-lg">Settings</span>
                    </button>
                </li>
            </ul>

            <div id="default-tab-content">
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
                                        .map((member: any) => (
                                            <MemberCard
                                                key={member._id}
                                                member={member}
                                            ></MemberCard>
                                        ))
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
                    <section className="flex flex-col mt-4 md:mt-8 lg:mt-12 overflow-hidden">
                        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">
                            Organisation settings
                        </h2>

                        <div className="flex flex-col md:gap-8 lg:gap-12 mt-4 md:mt-8 lg:mt-12">
                            <ul className="list-none mt-4 md:mt-8 lg:mt-12">
                                <li className="flex flex-row justify-between items-center gap-2">
                                    <label htmlFor="nameInput">Name: </label>
                                    <Input
                                        id="nameInput"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    ></Input>
                                </li>
                            </ul>
                            <div className="flex flex-col md:flex-row gap-4 lg:gap-8 mt-4 md:mt-8 lg:mt-12">
                                {/* <Button variant='outline'>Reset</Button> */}
                                <Button
                                    variant={"destructive"}
                                    disabled={loading}
                                    onClick={handleDeleteOrganization}
                                >
                                    Delete organization
                                </Button>
                                <Button variant="primary" disabled={loading}>
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
