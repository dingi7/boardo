import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./Components/Toaster/toaster";
// import './App.css';

import { LandingPage } from "./Pages/LandingPage/layout";
import { AuthProvider } from "react-auth-kit";

//Board components
import { BoardLayout } from "./Pages/Board/BoardLayout";

//AUTH COMPONENTS
import { Register } from "./Pages/Auth/Register";
import { Login } from "./Pages/Auth/Login";
import { ForgotPassword } from "./Pages/Auth/ForgotPassword";
import { ResetPassword } from "./Pages/Auth/ResetPassword";
import { Profile } from "./Pages/Auth/Profile";

import { DashboardLayout } from "./Pages/Dashboard/DashboardLayout";
import { BoardsPage } from "./Pages/Dashboard/pages/BoardsPage";
import { SettingsPage } from "./Pages/Dashboard/pages/SettingsPage";
import { ActivityPage } from "./Pages/Dashboard/pages/ActivityPage";
import { Navbar } from "./Components/navbar";
import { ThemeProvider } from "./ThemeProvider";
import { ModeToggle } from "./Components/mode-toggle";
import { DashboardContextProvider } from "./Pages/Dashboard/contexts/DashboardContextProvider";
import { StatisticsPage } from "./Pages/Dashboard/pages/StatisticsPage";

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen">
        <AuthProvider authType={"localstorage"} authName={"x-authorization"}>
          <DashboardContextProvider>
            <Toaster />
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/board/:boardId" element={<BoardLayout />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
                <Route
                  path="/auth/forgotPassword"
                  element={<ForgotPassword />}
                />
                <Route
                  path="/auth/resetPassword/:uuid"
                  element={<ResetPassword />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route
                    path=""
                    element={
                      <div className="flex items-center justify-center min-h-full">
                        <h1 className="text-2xl font-bold">
                          Select an Organization!
                        </h1>
                      </div>
                    }
                  />
                  <Route path="statistics" element={<StatisticsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="activity" element={<ActivityPage />} />
                  <Route path="boards" element={<BoardsPage />} />
                </Route>
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </BrowserRouter>
          </DashboardContextProvider>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
