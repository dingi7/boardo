import { Dashboard } from './Dashboard';
import { DashboardProvider } from './context/DashboardContext';

export const DashboardLayout = () => {
    return (
        <DashboardProvider>
            <Dashboard />
        </DashboardProvider>
    );
};
