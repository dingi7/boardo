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

    return (
        <div>
            
        </div>
    );
};