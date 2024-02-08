import { useCallback, useContext, useState } from "react";
import MemberCard from "../components/MemberCard";
import { Input } from "src/Components/ui/input";
import { Button } from "src/Components/ui/button";
import {
    removeMemberFromBoard,
    updateOrganization,
    updateOrganizationName,
    updateOrganizationPassword,
} from "src/api/requests";
import { useToast } from "src/Components/Toaster/use-toast";
import { useAuthUser } from "react-auth-kit";
import { DashboardContext } from "../contexts/DashboardContextProvider";
import { DeleteOrganizationDialog } from "../modals/DeleteOrganizationDialog";
import useFormData from "src/util/hooks/useFormData";
import { Label } from "src/Components/ui/label";
import { Textarea } from "src/Components/ui/textarea";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "src/Components/table";
type Props = {};

export const SettingsPage = (props: Props) => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("Dashboard context is not available");
    }
    const { selectedOrganization, setUserOrganizations } = context;

    const { toast } = useToast();

    const [loading, setLoading] = useState<boolean>(false);

    const [orgData, handleInputChange] = useFormData({
        name: selectedOrganization?.name,
        password: "",
        oldPassword: "",
    });
    const [activeTab, setActiveTab] = useState("members");

    const auth = useAuthUser()();
    
    const isOwner = auth?._id == selectedOrganization!.owner._id;
    

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handleUpdateOrganizationName = async () => {
        if (!orgData.name) {
            toast({
                title: "Name is required",
                variant: "destructive",
            });
            return;
        }
        setLoading(true);
        try {
            await updateOrganizationName(
                selectedOrganization!._id,
                orgData.name
            );
            toast({
                title: "Organization updated successfully",
                variant: "default",
            });
        } catch (err: any) {
            toast({
                title: err.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
            setUserOrganizations((prev: any) => {
                return prev.map((org: any) => {
                    if (org._id === selectedOrganization!._id) {
                        org.name = orgData.name;
                        return org;
                    }
                    return org;
                });
            });
        }
    };

    const handleUpdateOrganizationPassword = async () => {
        if (!orgData.password) {
            toast({
                title: "Password is required",
                variant: "destructive",
            });
            return;
        }
        if (!orgData.oldPassword) {
            toast({
                title: "Old password is required",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            await updateOrganizationPassword(
                selectedOrganization!._id,
                orgData.password,
                orgData.oldPassword
            );
            toast({
                title: "Organization updated successfully",
                variant: "default",
            });
        } catch (err: any) {
            toast({
                title: err.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleKickMember = async (boardId: string, memberId: string) => {
        if (!window.confirm("Are you sure you want to kick this member?")) {
            return;
        }
        setLoading(true);
        try {
            await removeMemberFromBoard(boardId, memberId);
            const newMembers = selectedOrganization!.members.filter(
                (member: any) => member._id !== memberId
            );
            setUserOrganizations((prev: any) => {
                return prev.map((org: any) => {
                    if (org._id === selectedOrganization!._id) {
                        org.members = newMembers;
                        return org;
                    }
                    return org;
                });
            });
            toast({
                title: "Member removed successfully",
            });
        } catch (e: any) {
            toast({
                title: e.message,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
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
                    className={`overflow-y-auto p-2 ${
                        activeTab === "members" ? "block" : "hidden"
                    }`}
                    id="members"
                    role="tabpanel"
                    aria-labelledby="members-tab"
                >
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                        <div className="flex items-center">
                            <h2 className="text-xl font-bold">
                                Members
                            </h2>
                        </div>
                        <div className="border shadow-sm rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="max-w-[150px]">
                                            Name
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Email
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Role
                                        </TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedOrganization!.members.length > 0
                                        ? selectedOrganization!.members.map(
                                              (member: any) => (
                                                  <MemberCard
                                                      isOwner={isOwner}
                                                      key={member._id}
                                                      member={member}
                                                      handleRemoveMember={
                                                          handleKickMember
                                                      }
                                                      selectedOrganization={
                                                          selectedOrganization
                                                      }
                                                  ></MemberCard>
                                              )
                                          )
                                        : null}
                                </TableBody>
                            </Table>
                        </div>
                    </main>
                </div>
                <div
                    className={`h-full overflow-y-auto p-2 ${
                        activeTab === "settings" ? "block" : "hidden"
                    }`}
                    id="settings"
                    role="tabpanel"
                    aria-labelledby="settings-tab"
                >
                    <main className="flex-1 p-6">
                        <section className="mb-8" id="general">
                            <h2 className="text-xl font-bold">
                                General Settings
                            </h2>
                            <div className="mt-4 space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="name">
                                        Organization Name
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter organization name"
                                        value={orgData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="org-desc">
                                        Organization Description
                                    </Label>
                                    <Textarea
                                        className="min-h-[100px]"
                                        id="org-desc"
                                        placeholder="Enter organization description"
                                    />
                                </div>
                                <Button onClick={handleUpdateOrganizationName}>
                                    Save
                                </Button>
                            </div>
                        </section>
                        <section className="mb-8" id="security">
                            <h2 className="text-xl font-bold">Security</h2>
                            <div className="mt-4 space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        placeholder="Enter new password"
                                        type="password"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="old-password">
                                        Old Password
                                    </Label>
                                    <Input
                                        id="oldPassword"
                                        placeholder="Old new password"
                                        type="password"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <Button
                                    onClick={handleUpdateOrganizationPassword}
                                >
                                    Change Password
                                </Button>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};
