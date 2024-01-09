import { Toaster } from '../../Components/Toaster/toaster';
import { Dashboard } from './DashboardPage';
import { DashboardContextProvider } from './contexts/DashboardContextProvider';

export const DashboardLayout = () => {
    return (
        <DashboardContextProvider>
            <Dashboard />
            <Toaster></Toaster>
        </DashboardContextProvider>
    );
};
