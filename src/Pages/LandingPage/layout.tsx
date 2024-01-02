
import { MarketingPage } from './LandingPage';
import { Footer } from './components/footer';
import { Navbar } from './components/navbar';

export const LandingPage = () => {
    return (
        <div className="h-screen bg-slate-100">
            <Navbar />
            <main className="h-full pt-40 pb-20 bg-slate-100">
                <MarketingPage />
            </main>
            <Footer />
        </div>
    );
};


