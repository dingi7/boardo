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
import { ProfileOrganisationComponent } from "./components/ProfileOrganisationComponent";



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

    const onChangeHandler = (e: any) =>{
        setAuthUser((prevState: any) => ({...prevState, [e.target.name]: e.target.value}))
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

                    <div className="w-full flex flex-row justify-between">
                        <div className="w-[50%]">
                            <h2 className="text-lg font-semibold">
                                Current organisations:
                            </h2>
                            <div className="w-full grid grid-cols-3 gap-[1dvw] pt-[2%]">
                                {authUser?.joinedOrganizations?.map((x: any) => (
                                    <ProfileOrganisationComponent
                                        name={x.name}
                                        owner={x.owner}
                                        key={x._id}
                                    />
                                ))}
                            </div>
                        </div>

                        <form
                            className="h-full w-[35%] flex flex-col gap-[6%] relative pt-[2%] "
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
                                <div className="w-full flex justify-end pr-[2%] gap-[1%]">
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
                </div>
            )}
        </div>
    );
};
