import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../../Components/ui/button";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";

import { Navbar } from "../../Components/navbar";
import { useToast } from "../../Components/Toaster/use-toast";
import { Pencil, UserCircleIcon } from "lucide-react";
import { Loading } from "src/Components/loading";
import { ProfileInput } from "src/Components/auth/ProfileInput";

export const Profile = () => {
    const [loading, setLoading] = useState<boolean>(false);
    //const authenticateUser = useAuth();
    const { toast } = useToast();

    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    const defaultAuthUser = useAuthUser()()
    const [authUser, setAuthUser] = useState(defaultAuthUser);
    const [isEdditing, setIsEdditing] = useState<boolean>(false);
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

    const handleUpdateUserData = (e: FormEvent) => {
        e.preventDefault()
        setIsEdditing(false)
        setLoading(true)
    }

    const handleUpdateCancel = () => {
        setAuthUser(defaultAuthUser)
        setIsEdditing(false)
    }

    return (
        <div className="h-screen bg-white flex justify-center items-center pt-[4%] overflow-hidden">
            <Navbar />
            {loading ? (
                <Loading />
            ) : (
                <div className="w-[95%] px-[2.5%] h-[92%] border-1 bg-[#e2e2e2] rounded-md flex flex-col p-12 pb-16 gap-[8%]">
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-[20%] flex flex-row gap-[3%]">
                            <div className="w-[20%] aspect-square">
                                <UserCircleIcon className="w-full h-full" />
                            </div>
                            <div className="flex items-center">
                                <p className="font-bold text-xl">
                                    {defaultAuthUser?.username}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">
                            Current organisations:
                        </h2>
                    </div>

                    <form className="h-[50%] w-[60%] flex flex-col gap-[6%] relative pt-[2%] pr-[7%]" onSubmit={handleUpdateUserData}>
                        <div className="w-full flex flex-col">
                            <ProfileInput 
                                id="username"
                                onChange={setAuthUser}
                                value={authUser?.username}
                                text="Username:"
                                type="text"
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <label>Email:</label>
                            <input
                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                                    !isEdditing ? "opacity-60" : ""
                                }`}
                                type="email"
                                disabled={!isEdditing}
                                value={authUser?.email}
                                onChange={setAuthUser}
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <label>Password:</label>
                            <input
                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                                    !isEdditing ? "opacity-60" : ""
                                }`}
                                disabled={!isEdditing}
                                type="password"
                                value={authUser?.email}
                                onChange={setAuthUser}
                            />
                        </div>

                        {isEdditing && (
                            <div className="w-full flex justify-end pr-[2%] gap-[1%]">
                                <Button variant="outline" onClick={handleUpdateCancel}>Cancel</Button>
                                <Button className="w-1/4" type="submit">Save</Button>
                            </div>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};
