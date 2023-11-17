import { Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../../api/requests';
import { AuthInput } from '../../Components/AuthInput';
import { useAuthUser, useSignIn } from 'react-auth-kit';

export const Register = () => {
    const signIn = useSignIn();
    const auth = useAuthUser();
    const [userData, setUserData] = useState({
        firstName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (userData.password !== userData.confirmPassword) {
                throw new Error('Passwords do not match');
            }
            const response = await registerUser(userData);
            signIn({
                token: response.accessToken,
                expiresIn: 9999, // change this later
                tokenType: "Bearer",
            });
            console.log(auth);
        } catch (err: any) {
            alert(err.message);
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
                            type="text"
                            text="First Name"
                            id="firstName"
                            setUserData={setUserData}
                        />
                        <AuthInput
                            type="text"
                            text="Username"
                            id="username"
                            setUserData={setUserData}
                        />
                        <AuthInput
                            type="password"
                            text="Password"
                            id="password"
                            setUserData={setUserData}
                        />
                        <AuthInput
                            type="password"
                            text="Confirm Password"
                            id="confirmPassword"
                            setUserData={setUserData}
                        />
                        <div className="text-white text-left">
                            Already registered?{' '}
                            <Link to="/auth/login" className="font-bold ">
                                Login
                            </Link>
                        </div>
                    </div>

                    <button
                        className="shadow border-2 font-bold border-slate-800 rounded w-full py-3 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-900 outline-none hover:bg-zinc-700"
                        id="registerButton"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};
