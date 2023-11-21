import { Link, useNavigate } from 'react-router-dom';
import { AuthInput } from '../../Components/ui/AuthInput';
import { authRoutes } from '../../util/routesList';
import { useEffect, useState } from 'react';
import { loginUser } from '../../api/requests';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { errorNotification } from '../../util/notificationHandler';

type Props = {};

export const Login = (props: Props) => {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    useEffect(() => {
        if (isAuth()) {
            navigate('/');
            errorNotification('You are already logged in');
        }
    }, [isAuth, navigate]);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await loginUser(userData);
            signIn({
                token: response.accessToken,
                expiresIn: 9999, // change this later
                tokenType: 'Bearer',
                authState: response,
            });
            navigate('/');
        } catch (err: any) {
            errorNotification(err.message);
        }
    };

    return (
        <div className="h-screen bg-black flex justify-center items-center drop-shadow-md">
            <div className=" w-[600px] h-[650px] bg-zinc-800 border-2 border-slate-800 rounded-md flex flex-col p-12 pb-16 justify-between">
                <h1 className="text-white">Boardo</h1>
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
                        <div className="text-white text-left">
                            Already registered?{' '}
                            <Link
                                to={authRoutes.register}
                                className="font-bold "
                            >
                                Register
                            </Link>
                        </div>
                    </div>

                    <button
                        className="shadow border-2 font-bold border-slate-800 rounded w-full py-3 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-900 outline-none hover:bg-zinc-700"
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
