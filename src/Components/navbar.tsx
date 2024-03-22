import { Logo } from './ui/logo';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuthUser, useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { Avatar, AvatarImage } from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './dropdown';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './alertDialog';

export const Navbar = () => {
    const isAuth = useIsAuthenticated();
    const navigate = useNavigate();
    const authUser = useAuthUser()();
    const signOut = useSignOut();
    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    return (
        <div className='w-full px-4 py-2 border-b shadow-sm bg-white flex items-center'>
            <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
                <Logo />

                <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
                    {isAuth() ? (
                        <div className='flex items-center gap-2'>
                            <Button variant={'gray'} size='sm' asChild>
                                <Link to='/dashboard'>Dashboard</Link>
                            </Button>
                            <AlertDialog>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage
                                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${authUser?.username}&radius=50&backgroundColor=a3a3a3&fontSize=35&bold=true`}
                                                alt='User avatar'
                                            />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            My Account
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <Link to='/profile'>
                                            <DropdownMenuItem>
                                                Profile
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem>
                                            <AlertDialogTrigger asChild>
                                                <span>Logout</span>
                                            </AlertDialogTrigger>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleSignOut}
                                        >
                                            Logout
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ) : (
                        <>
                            <Button size='sm' variant='outline' asChild>
                                <Link to='/auth/login'>Login</Link>
                            </Button>
                            <Button size='sm' variant='primary' asChild>
                                <Link to='/auth/register'>
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
