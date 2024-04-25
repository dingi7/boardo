import { Logo } from './ui/logo';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuthUser, useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { Avatar, AvatarImage } from './ui/avatar';
import { User, LogOutIcon } from 'lucide-react';

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
import { Inbox } from 'lucide-react';
import { Dialog, DialogTrigger } from './ui/dialog';
import { InboxDialog } from 'src/Pages/Inbox/Inbox';

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
    <div className='flex items-center w-full px-4 py-2 bg-white border-b shadow-sm'>
      <div className='flex items-center justify-between w-full mx-auto md:max-w-screen-2xl'>
        <Logo />

        <div className='flex items-center justify-between w-full space-x-4 md:block md:w-auto'>
          {isAuth() ? (
            <div className='flex items-center gap-2'>
              <Button variant={'gray'} size='sm' asChild>
                <Link to='/dashboard'>Dashboard</Link>
              </Button>
              <DropdownMenu>
                <InboxDialog />
              </DropdownMenu>
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
                    <DropdownMenuLabel className='flex flex-col'>
                      <span>{authUser?.username}</span>
                      <span className='font-normal'>{authUser?.email}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <Link to='/profile' className='flex items-center w-full'>
                        <div className='flex items-center w-full gap-1'>
                          <User color='#404040' size={20} />
                          <span className='text-md'>Profile</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem>
                        <div className='flex items-center w-full gap-1'>
                          <LogOutIcon color='#404040' size={20} />
                          <span className='text-md'>Logout</span>
                        </div>
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSignOut}>
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
                <Link to='/auth/register'>Get Boardo for free</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
