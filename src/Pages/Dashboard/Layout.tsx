import { Toaster } from '../../Components/Toaster/toaster';
import { Dashboard } from './Dashboard';
import { DashboardProvider } from './context/DashboardContext';

export const DashboardLayout = () => {
    return (
        <DashboardProvider>
            <Dashboard />
            <Toaster></Toaster>
        </DashboardProvider>
    );
};
