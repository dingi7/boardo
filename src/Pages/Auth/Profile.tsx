import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useToast } from "../../Components/Toaster/use-toast";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "src/Components/ui/card";
import { Label } from "src/Components/ui/label";
import { Input } from "src/Components/ui/input";
import { Button } from "src/Components/ui/button";
import { ProfileOrganizationComponent } from "./components/ProfileOrganizationComponent";
import { IOrg } from "src/Interfaces/IContexts";
import {
    changePassword,
    getUserOrganizations,
    leaveOrganization,
} from "src/api/requests";

export const Profile = () => {
    /// !!!! fix mee
    const { toast } = useToast();
    const navigate = useNavigate();
    const authUser = useAuthUser()();
    const [userOrganizations, setUserOrganizations] = useState<IOrg[]>([]);
    const [userData, setUserData] = useState({
        username: authUser?.username,
        email: authUser?.email,
        password: ""
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false); // Add loading state

    const handlePasswordInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleUserDataInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const fetchOrganizations = useCallback(async () => {
        try {
            setLoading(true); // Set loading state to true
            const organizations = await getUserOrganizations();
            setUserOrganizations(organizations);
        } catch (err: any) {
            toast({
                title: err.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false); // Set loading state to false
        }
    }, [toast]);

    useEffect(() => {
        if (!authUser) {
            navigate("/");
            toast({
                title: "You are not logged in",
                variant: "destructive",
            });
        } else {
            fetchOrganizations();
        }
    }, [authUser, navigate, toast, fetchOrganizations]);

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault();

            if (event.currentTarget.id === "userInfoForm") {
                const validation = validateUserInfoChange(
                    userData.username,
                    userData.email,
                )
                if (validation !== null) {
                    throw new Error(validation.message);
                }

                //const result = await 

                toast({
                    description: "User data updated!",
                    variant: "default",
                })
            } else {
                // Validate password change
                const validation = validatePasswordChange(
                    passwordData.currentPassword,
                    passwordData.newPassword,
                    passwordData.confirmPassword
                );
                if (validation !== null) {
                    throw new Error(validation.message);
                }

                const result = await changePassword(
                    passwordData.currentPassword,
                    passwordData.newPassword
                );

                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                toast({
                    //title: "Error",
                    description: "Password updated!",
                    variant: "default",
                });
            }
        } catch (e: any) {
            toast({
                title: "Error",
                description: e.message,
                variant: "destructive",
            });
        }
    };

    const validatePasswordChange = (
        currentPassword: string,
        newPassword: string,
        confirmPassword: string
    ) => {
        if (!currentPassword) {
            return new Error("Current password required!");
        }
        if (!newPassword || !confirmPassword) {
            return new Error(
                "New password and confirm password fields can not be empty!"
            );
        }
        if (newPassword !== confirmPassword) {
            return new Error("Passwords do not match!");
        }
        return null;
    };

    const validateUserInfoChange = (username: string, email: string) => {
        if (!username || !email) {
            return new Error("Username and email required!");
        }

        return null;
    };

    const handleOrganizationLeave = async (orgId: string) => {
        try {
            await leaveOrganization(orgId);
            setUserOrganizations((prev: any) =>
                prev.filter((org: IOrg) => org._id !== orgId)
            );
            toast({
                title: "Organization " + orgId + " left successfully",
            });
        } catch (e: any) {
            toast({
                title: "Error",
                description: e.message,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            <section className="w-full lg:w-1/3 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* UserInfo form */}
                        <form id="userInfoForm" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={userData?.username}
                                    onChange={handleUserDataInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    type="email"
                                    value={userData?.email}
                                    onChange={handleUserDataInputChange}
                                />
                            </div>
                            <div className="text-right pt-[4%]">
                                <Button className="ml-auto">
                                    Update Information
                                </Button>
                            </div>
                        </form>

                        {/* Password form */}
                        <form id="passwordForm" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="oldPassword">
                                    Current Password
                                </Label>
                                <Input
                                    name="currentPassword"
                                    id="oldPassword"
                                    placeholder="Enter your current password"
                                    type="password"
                                    value={passwordData?.currentPassword}
                                    onChange={handlePasswordInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">
                                    New Password
                                </Label>
                                <Input
                                    name="newPassword"
                                    id="newPassword"
                                    placeholder="Enter your new password"
                                    type="password"
                                    value={passwordData?.newPassword}
                                    onChange={handlePasswordInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <Input
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    type="password"
                                    value={passwordData?.confirmPassword}
                                    onChange={handlePasswordInputChange}
                                />
                            </div>
                            <div className="text-right mt-[4%]">
                                <Button>Update Password</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </section>
            <section className="w-full lg:w-2/3 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Organizations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {loading ? (
                            <div className="flex justify-center">
                                {/**Add loading spinner */}
                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                            </div>
                        ) : (
                            userOrganizations.map((org: IOrg) =>
                                ProfileOrganizationComponent({
                                    name: org.name,
                                    owner: org.owner,
                                    userId: authUser!._id,
                                    orgId: org._id,
                                    leaveOrgFunc: handleOrganizationLeave,
                                })
                            )
                        )}
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};
