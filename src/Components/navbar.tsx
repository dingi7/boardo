import { Logo } from './ui/logo';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import React from 'react';

export const Navbar = () => {
    const isAuth = useIsAuthenticated();
    const navigate = useNavigate();

    const signOut = useSignOut()

    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            // navigate to /
            signOut();
            navigate('/')
        }
    };
    


        return (
            <div className="block fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-white flex items-center z-50">
                <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                    <Logo />
                    <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                        {isAuth() ? (
                            <>
                                <Button variant={'gray'} size="sm">
                                    <Link to="/dashboard">Dashboard</Link>
                                </Button>

                                <Button variant={'gray'} size="sm">
                                    <a onClick={handleSignOut}>Logout</a>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button size="sm" variant="outline" asChild>
                                    <Link to="/auth/login">Login</Link>
                                </Button>
                                <button className="bg-neutral-200 text-secondary-foreground hover:bg-neutral-300 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                                    <Link to="/auth/register">
                                        Get Boardo for free
                                    </Link>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };
