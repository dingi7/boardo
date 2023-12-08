import { Link } from "react-router-dom";
import logoSvg from './assets/logo.svg'
import React from "react";

export const Logo = () => {
    return (
        <Link to="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <img src={logoSvg} alt="Logo" height={30} width={30} />
                <p className="text-lg text-neutral-700 pb-1 font-bold">Boardo</p>
            </div>
        </Link>
    );
};
