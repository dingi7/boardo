import { MarketingPage } from './LandingPage';
import { Footer } from './components/footer';
import { Navbar } from '../../Components/navbar';

export const LandingPage = () => {
    return (
        <div className="flex flex-col flex-1">
            <main className="flex-grow pt-40 pb-20 bg-slate-100">
                <MarketingPage />
            </main>
            <Footer />
        </div>
    );
};
