import { Logo } from "./ui/logo";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import React from "react";

export const Navbar = () => {
    const isAuth = useIsAuthenticated();
    const navigate = useNavigate();

    const signOut = useSignOut();

    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            signOut();
            navigate("/");
        }
    };

    return (
        <div className="fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-white flex items-center z-50">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    {isAuth() ? (
                        <>
                            <Button variant={"gray"} size="sm" asChild>
                                <Link to="/dashboard">Dashboard</Link>
                            </Button>

                            <Button
                                variant={"gray"}
                                size="sm"
                                asChild
                                onClick={handleSignOut}
                            >
                                <span className="cursor-pointer">Logout</span>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button size="sm" variant="outline" asChild>
                                <Link to="/auth/login">Login</Link>
                            </Button>
                            <Button size="sm" variant="primary" asChild>
                                <Link to="/auth/register">
                                    Get Boardo for free
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
