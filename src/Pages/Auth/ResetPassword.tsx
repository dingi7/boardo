import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Logo } from "../../Components/ui/logo";
import { Button } from "../../Components/ui/button";
import { useIsAuthenticated } from "react-auth-kit";
import { IResetPassword } from "../../Interfaces/IUserData";
import useFormData from "../../util/hooks/useFormData";
//import { Navbar } from '../../Components/navbar';
import { AuthInput } from "../../Components/auth/auth-input";
import { useToast } from "../../Components/Toaster/use-toast";
import { resetPassword, tokenValidator } from "src/api/requests";
import { Loading } from "src/Components/loading";

export const ResetPassword = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const { toast } = useToast();

    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    useEffect(() => {
        setLoading(true);
        if (isAuth()) {
            navigate("/");
            toast({
                title: "You are already logged in",
                variant: "destructive" 
            });
        }
        const isTokenValid = async () => {
            try {
                const response = await tokenValidator(uuid!);
                console.log(response);
            } catch (err: any) {
                toast({
                    title: err.message,
                    variant: "destructive" 
                });
                navigate("/auth/login");
            }
            setLoading(false);
        }
        isTokenValid();
    }, [isAuth, navigate]);
    const [resetPassData, handleInputChange] = useFormData<IResetPassword>({
        password: "",
        confirmPassword: "",
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!resetPassData?.password || !resetPassData?.confirmPassword)
                throw new Error("Please fill in all the fields");

            if (resetPassData.password !== resetPassData.confirmPassword)
                throw new Error("Password do not match!");
            setLoading(true);
            const response = await resetPassword(uuid!, resetPassData!.password)
            console.log(response);
            //const response = await loginUser(resetPassData!);
            //await authenticateUser(response);
            navigate("/auth/login");
            toast({ title: "Password sucesfully reseted!" });
        } catch (err: any) {
            toast({
                title: err.message,
            });
        }
        setLoading(false);
    };

    if (loading){
        return (
            <Loading/>
        )
    }

    return (
        <div className="h-screen bg-white flex justify-center items-center">
            <div className="w-[95%] md:w-[60%] lg:w-[50%] xl:w-[46%] border-1 bg-[#e2e2e2] rounded-md flex flex-col p-12 pb-16 justify-between">
                <div className="mx-auto">
                    <Logo />
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <AuthInput
                            type="password"
                            text="Passoword"
                            id="password"
                            onChange={handleInputChange}
                        />
                        <AuthInput
                            type="password"
                            text="Confirm password"
                            id="confirmPassword"
                            onChange={handleInputChange}
                        />
                    </div>
                    <Button
                        className="shadow border-1 mt-4 font-semibold border-slate-800 bg-white rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline outline-none hover:bg-zinc-100"
                        type="submit"
                        variant={"ghost"}
                        id="registerButton"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Reset password"}
                    </Button>
                </form>
            </div>
        </div>
    );
};
