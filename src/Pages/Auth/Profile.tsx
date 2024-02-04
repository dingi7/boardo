import { useNavigate } from "react-router-dom";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { Button } from "../../Components/ui/button";
import { useIsAuthenticated, useAuthUser, useSignOut } from "react-auth-kit";

import { Navbar } from "../../Components/navbar";
import { useToast } from "../../Components/Toaster/use-toast";
import { UserCircleIcon } from "lucide-react";
import { Loading } from "src/Components/loading";
import { ProfileInput } from "src/Components/auth/ProfileInput";
import { EditingState } from "src/Interfaces/IUserData";
import { ProfileOrganizationComponent } from "./components/ProfileOrganizationComponent";

export const Profile = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isEdditing, setIsEdditing] = useState<EditingState>({
        username: false,
        email: false,
        password: false,
    });
    const signOut = useSignOut();

    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            signOut();
            navigate("/");
        }
    };
    //const authenticateUser = useAuth();
    const { toast } = useToast();

    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    const defaultAuthUser = useAuthUser()();
    const [authUser, setAuthUser] = useState(defaultAuthUser);

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
        e.preventDefault();
        setLoading(true);
    };

    const handleUpdateCancel = () => {
        setAuthUser(defaultAuthUser);
        setIsEdditing({
            username: false,
            email: false,
            password: false,
        });
    };

    const onChangeHandler = (e: any) => {
        setAuthUser((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="flex flex-1">
            {loading ? (
                <Loading />
            ) : (
                <div className="w-full p-[2%] border-1 bg-[#e2e2e2]/40 rounded-md grid gap-[2vh]">
                    <div className="w-full grid grid-cols-2 gap-[2vh]">
                        <div className="col-span-1 bg-[#e2e2e2]/80 rounded-xl p-[4%] flex items-start gap-[3%]">
                            <div className="w-[20%] aspect-square">
                                <UserCircleIcon className="w-full h-full" />
                            </div>
                            <div className="flex items-center">
                                <p className="font-bold text-xl">{defaultAuthUser?.username}</p>
                            </div>
                        </div>

                        <form
                            className="col-span-1 bg-[#e2e2e2]/80 rounded-xl p-[4%] py-[5%] flex flex-col relative"
                            onSubmit={handleUpdateUserData}
                        >
                            <div className="flex flex-col">
                                <ProfileInput
                                    id="username"
                                    onChange={onChangeHandler}
                                    value={authUser?.username}
                                    text="Username:"
                                    type="text"
                                    isEdditing={isEdditing}
                                    name="username"
                                    setIsEdditing={(inputField: string, value: boolean) =>
                                        setIsEdditing((prevState) => ({
                                            ...prevState,
                                            [inputField]: value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex flex-col">
                                <ProfileInput
                                    id="email"
                                    name="email"
                                    onChange={onChangeHandler}
                                    value={authUser?.email}
                                    text="Email:"
                                    type="text"
                                    isEdditing={isEdditing}
                                    setIsEdditing={(inputField: string, value: boolean) =>
                                        setIsEdditing((prevState) => ({
                                            ...prevState,
                                            [inputField]: value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex flex-col">
                                <ProfileInput
                                    id="password"
                                    name="password"
                                    onChange={onChangeHandler}
                                    value=""
                                    text="Change Password:"
                                    type="password"
                                    isEdditing={isEdditing}
                                    setIsEdditing={(inputField: string, value: boolean) =>
                                        setIsEdditing((prevState) => ({
                                            ...prevState,
                                            [inputField]: value,
                                        }))
                                    }
                                />
                            </div>

                            {Object.values(isEdditing).some((value) => value) && (
                                <div className="flex justify-end pr-[3%] gap-[3%] absolute bottom-[3%] right-[5%]">
                                    <Button variant="outline" onClick={handleUpdateCancel} type="button">
                                        Cancel
                                    </Button>
                                    <Button className="w-2/4" type="submit">
                                        Save
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-[2vh]">
                        <div className="col-span-1 bg-[#e2e2e2]/80 rounded-xl p-[4%]">
                            <h2 className="text-lg font-semibold">Activity:</h2>
                        </div>

                        <div className="col-span-1 bg-[#e2e2e2]/80 rounded-xl p-[4%]">
                            <h2 className="text-lg font-semibold">Current organizations:</h2>
                            <div className="w-full grid grid-cols-3 gap-[1dvw] pt-[2%]">
                                {authUser?.joinedOrganizations?.map((x: any) => (
                                    <ProfileOrganizationComponent name={x.name} owner={x.owner} key={x._id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};