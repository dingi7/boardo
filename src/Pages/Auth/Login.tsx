import { Link, useNavigate } from "react-router-dom";
import { AuthInput } from "../../Components/ui/AuthInput";
import { authRoutes } from "../../util/routesList";
import { useEffect, useState } from "react";
import { loginUser } from "../../api/requests";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { errorNotification } from "../../util/notificationHandler";

type Props = {};

export const Login = (props: Props) => {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    useEffect(() => {
        if (isAuth()) {
            navigate("/");
            errorNotification("You are already logged in");
        }
    }, [isAuth, navigate]);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await loginUser(userData);
            signIn({
                token: response.accessToken,
                expiresIn: 9999, // change this later
                tokenType: "Bearer",
                authState: response,
            });
            navigate("/");
        } catch (err: any) {
            errorNotification(err.message);
        }
    };

    return (
        <div className="h-screen bg-white flex justify-center items-center">
            <div className=" w-[600px] border-1 bg-[#e2e2e2] rounded-md flex flex-col p-12 pb-16 justify-between">
                <h1 className="text-black mb-5 text-center">Boardo</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <AuthInput
                            type="email"
                            text="Email"
                            id="email"
                            setUserData={setUserData}
                        />
                        <AuthInput
                            type="password"
                            text="Password"
                            id="password"
                            setUserData={setUserData}
                        />
                        <div className="text-black text-left">
                            Already registered?{" "}
                            <Link
                                to={authRoutes.register}
                                className="font-semibold"
                            >
                                Register
                            </Link>
                        </div>
                    </div>

                    <button
                        className="shadow border-1 mt-4 font-semibold border-slate-800 bg-white rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline outline-none hover:bg-zinc-100"
                        id="registerButton"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};
