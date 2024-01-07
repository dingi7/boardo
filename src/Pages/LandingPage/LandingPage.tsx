import { Medal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';
import { Button } from '../../Components/ui/button';

export const MarketingPage = () => {
    const isAuth = useIsAuthenticated();

    return (
        <div className='h-full flex items-center justify-center flex-col'>
            <div className='flex items-center justify-center flex-col'>
                <div className='mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase'>
                    <Medal className='h-6 w-6 mr-2' />
                    No 1 task managment
                </div>
                <h1 className='text-3xl md:text-6xl text-center text-neutral-800 mb-6'>
                    Boardo helps team move
                </h1>
                <div className='text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit'>
                    work forward.
                </div>
            </div>
            <div className='text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto'>
                Collaborate, manage projects, and reach new productivity peaks.
                From high rises to the home office, the way your team works is
                unique - accomplish it all with Boardo.
            </div>
            {isAuth() ? (
                <Button className='inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary  hover:bg-primary/90 h-11 rounded-md px-8 mt-6 bg-neutral-200 text-secondary-foreground hover:bg-neutral-300'>
                    <Link to='/dashboard'>Dashboard</Link>
                </Button>
            ) : (
                <Button className='inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary  hover:bg-primary/90 h-11 rounded-md px-8 mt-6 bg-neutral-200 text-secondary-foreground hover:bg-neutral-300'>
                    <Link to='/auth/register'>Get Boardo for free</Link>
                </Button>
            )}
        </div>
    );
};
