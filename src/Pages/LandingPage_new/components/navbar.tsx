import { Logo } from '../../../Components/logo';
import { Button } from '../../../Components/ui/button';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size="sm" variant="outline" asChild>
                        <Link to="/sign-in">Login</Link>
                    </Button>
                    <button className="bg-neutral-200 text-secondary-foreground hover:bg-neutral-300 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                        <Link to="/sign-up">Get Boardo for free</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};
