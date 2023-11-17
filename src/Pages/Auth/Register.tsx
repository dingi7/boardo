<<<<<<< Updated upstream

import { Link } from "react-router-dom";
import { AuthInput } from "../../Components/AuthInput";
import { authRoutes } from "../../util/routesList";
=======
import { Link } from 'react-router-dom';
import { AuthInput } from '../../Components/AuthInput';
import { useState } from 'react';
import { registerUser } from '../../api/requests';
>>>>>>> Stashed changes

export const Register = () => {
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
            
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="h-screen bg-black flex justify-center items-center drop-shadow-md">
            <div className=" w-[600px] h-[650px] bg-zinc-800 border-2 border-slate-800 rounded-md flex flex-col p-12 pb-16 justify-between">
                <h1 className="text-white">Boardo</h1>
                <div>
                    <AuthInput
                        type="email"
                        text="Email"
                        id="email"
                        setData={setUserData}
                    />
                    <AuthInput
                        type="text"
                        text="First Name"
                        id="firstName"
                        setData={setUserData}
                    />
                    <AuthInput
                        type="text"
                        text="Username"
                        id="username"
                        setData={setUserData}
                    />
                    <AuthInput
                        type="password"
                        text="Password"
                        id="password"
                        setData={setUserData}
                    />
                    <AuthInput
                        type="password"
                        text="Confirm Password"
                        id="confirmPassword"
                        setData={setUserData}
                    />
                    <div className="text-white text-left">
<<<<<<< Updated upstream
                        Already registered?{" "}
                        <Link to={authRoutes.login} className="font-bold ">
=======
                        Already registered?{' '}
                        <Link to="/auth/login" className="font-bold ">
>>>>>>> Stashed changes
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
            </div>
        </div>
    );
};
