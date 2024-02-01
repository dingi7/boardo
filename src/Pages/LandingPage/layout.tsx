
import { MarketingPage } from './LandingPage';
import { Footer } from './components/footer';
import { Navbar } from '../../Components/navbar';

export const LandingPage = () => {
    return (
        <>
            <main className="h-[1180px] pt-40 pb-20 bg-slate-100">
                <MarketingPage />
            </main>
            <Footer />
        </>
    );
};


