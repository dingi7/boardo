import { MarketingPage } from './LandingPage_new';
import { Footer } from './components/footer';
import { Navbar } from './components/navbar';

export const MarketingLayout = () => {
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

export default MarketingLayout;
