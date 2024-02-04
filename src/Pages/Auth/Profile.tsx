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
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div className="w-full px-[2%] flex-1  border-1 bg-[#e2e2e2]/40 rounded-md flex flex-col gap-[2vh] ">
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-[39%] flex flex-row gap-[3%] items-start bg-[#e2e2e2]/80 rounded-xl p-[4%]">
                            <div className="w-[20%] aspect-square">
                                <UserCircleIcon className="w-full h-full" />
                            </div>
                            <div className="flex items-center">
                                <p className="font-bold text-xl">
                                    {defaultAuthUser?.username}
                                </p>
                            </div>
                        </div>

                        <form
                            className="w-[60%] flex flex-col gap-[6%] relative pt-[2%] bg-[#e2e2e2]/80 p-[4%] py-[10%] rounded-xl"
                            onSubmit={handleUpdateUserData}
                        >
                            <div className="w-full flex flex-col">
                                <ProfileInput
                                    id="username"
                                    onChange={onChangeHandler}
                                    value={authUser?.username}
                                    text="Username:"
                                    type="text"
                                    isEdditing={isEdditing}
                                    name="username"
                                    setIsEdditing={(
                                        inputField: string,
                                        value: boolean
                                    ) =>
                                        setIsEdditing((prevState) => ({
                                            ...prevState,
                                            [inputField]: value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <ProfileInput
                                    id="email"
                                    name="email"
                                    onChange={onChangeHandler}
                                    value={authUser?.email}
                                    text="Email:"
                                    type="text"
                                    isEdditing={isEdditing}
                                    setIsEdditing={(
                                        inputField: string,
                                        value: boolean
                                    ) =>
                                        setIsEdditing((prevState) => ({
                                            ...prevState,
                                            [inputField]: value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="w-full flex flex-col">
                                <ProfileInput
                                    id="password"
                                    name="password"
                                    onChange={onChangeHandler}
                                    value=""
                                    text="Password:"
                                    type="password"
                                    isEdditing={isEdditing}
                                    setIsEdditing={(
                                        inputField: string,
                                        value: boolean
                                    ) =>
                                        setIsEdditing((prevState) => ({
                                            ...prevState,
                                            [inputField]: value,
                                        }))
                                    }
                                />
                            </div>

                            {Object.values(isEdditing).some(
                                (value) => value
                            ) && (
                                <div className="w-full flex justify-end pr-[3%] gap-[1%] absolute bottom-[24%] right-[5%]">
                                    <Button
                                        variant="outline"
                                        onClick={handleUpdateCancel}
                                        type="button"
                                    >
                                        Cancel
                                    </Button>
                                    <Button className="w-1/4" type="submit">
                                        Save
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="w-[39%] bg-[#e2e2e2]/80 rounded-xl p-[4%]">
                            <h2 className="text-lg font-semibold">
                                Activity:
                            </h2>

                        </div>

                        <div className="w-[60%] bg-[#e2e2e2]/80 rounded-xl p-[4%]">
                            <h2 className="text-lg font-semibold">
                                Current organizations:
                            </h2>
                            <div className="w-full grid grid-cols-3 gap-[1dvw] pt-[2%]">
                                {authUser?.joinedOrganizations?.map(
                                    (x: any) => (
                                        <ProfileOrganizationComponent
                                            name={x.name}
                                            owner={x.owner}
                                            key={x._id}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};