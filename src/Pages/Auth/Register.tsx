import React from "react";
import { Link } from "react-router-dom";
import { AuthInput } from "../../Components/AuthInput";

type Props = {};

export const Register = (props: Props) => {
    return (
        <div className="h-screen bg-black flex justify-center items-center drop-shadow-md">
            <div className=" w-[600px] h-[650px] bg-zinc-800 border-2 border-slate-800 rounded-md flex flex-col p-12 pb-16 justify-between">
                <h1 className="text-white">Boardo</h1>
                <div>
                    <AuthInput type="email" text="Email" id="email" />
                    <AuthInput type="password" text="Password" id="password" />
                    <AuthInput
                        type="password"
                        text="Confirm Password"
                        id="confirmPassword"
                    />
                    <div className="text-white text-left">
                        Already registered?{" "}
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
            </div>
        </div>
    );
};
