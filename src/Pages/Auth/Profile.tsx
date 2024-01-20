import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../Components/ui/button";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";

import { useAuth } from "./hooks/useAuth";
import useFormData from "../../util/hooks/useFormData";
import { Navbar } from "../../Components/navbar";
import { AuthInput } from "../../Components/auth/auth-input";
import { useToast } from "../../Components/Toaster/use-toast";
import { Settings, UserCircleIcon } from "lucide-react";
import { Loading } from "src/Components/loading";

export const Profile = () => {
    const [loading, setLoading] = useState<boolean>(false);
    //const authenticateUser = useAuth();
    const { toast } = useToast();

    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    const [authUser, setAuthUser] = useState(useAuthUser()());
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

    return (
        <div className="h-screen bg-white flex justify-center items-center pt-[4%]">
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
                                    {authUser?.username}
                                </p>
                            </div>
                        </div>
                        <div>
                            <Settings onClick={() => setIsEdditing(!isEdditing)}/>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">
                            Current organisations:
                        </h2>
                    </div>

                    <div className="h-[50%] flex flex-col gap-[6%]">
                        <div className="w-[65%]">
                            <label>Email:</label>
                            <input
                                className={`bg-gray-50 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                                    !isEdditing ? "opacity-60" : ""
                                }`}
                                disabled
                                value={authUser?.email}
                            />
                        </div>
                        <div className="w-[65%] flex flex-col">
                            <label>Password:</label>
                            <input
                                className={`bg-gray-50 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                                    !isEdditing ? "opacity-60" : ""
                                }`}
                                disabled
                                type="password"
                                value={authUser?.email}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
