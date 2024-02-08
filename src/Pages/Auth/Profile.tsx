import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
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

export const Profile = () => {
    const { toast } = useToast();

    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    const defaultAuthUser = useAuthUser()();
    const [authUser, setAuthUser] = useState(defaultAuthUser);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        console.log(authUser);
        if (!authUser) {
            navigate("/");
            toast({
                title: "You are not logged in",
                variant: "destructive",
            });
        }
    }, [isAuth, navigate, authUser]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            <section className="w-full lg:w-1/3 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Enter your username"
                                value={authUser?.username}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="Enter your email"
                                type="email"
                                value={authUser?.email}
                            />
                        </div>
                        <div className="text-right pt-4">
                            <Button className="ml-auto">
                                Update Information
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="oldPassword">
                                Current Password
                            </Label>
                            <Input
                                id="oldPassword"
                                placeholder="Enter your current password"
                                type="password"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                placeholder="Enter your new password"
                                type="password"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                type="password"
                                onChange={handleInputChange}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="ml-auto">Update Password</Button>
                    </CardFooter>
                </Card>
            </section>
            <section className="w-full lg:w-2/3 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Activity Feed</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-600 p-2 rounded-md">
                            <span className="font-semibold">
                                Commented on Project 1
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                2 hours ago
                            </span>
                        </div>
                        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-600 p-2 rounded-md">
                            <span className="font-semibold">
                                Commented on Project 1
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                2 hours ago
                            </span>
                        </div>
                        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-600 p-2 rounded-md">
                            <span className="font-semibold">
                                Commented on Project 1
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                2 hours ago
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Organizations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {authUser?.joinedOrganizations.map((org: IOrg) =>
                            ProfileOrganizationComponent({
                                name: org.name,
                                owner: org.owner,
                            })
                        )}
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};
