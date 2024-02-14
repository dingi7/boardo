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

function App() {
    return (
        <div className="flex h-screen flex-col">
            <ThemeProvider>
                <AuthProvider
                    authType={"localstorage"}
                    authName={"x-authorization"}
                >
                    <Toaster />
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/landing" element={<LandingPage />} />
                            <Route
                                path="/board/:boardId"
                                element={<BoardLayout />}
                            />
                            <Route
                                path="/auth/register"
                                element={<Register />}
                            />
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
                            <Route
                                path="/dashboard"
                                element={<DashboardLayout />}
                            >
                                <Route
                                    path=""
                                    element={
                                        <div className="flex justify-center items-center min-h-full">
                                            <h1 className="text-2xl font-bold">
                                                Select Organization!
                                            </h1>
                                        </div>
                                    }
                                />
                                <Route
                                    path="settings"
                                    element={<SettingsPage />}
                                />
                                <Route
                                    path="activity"
                                    element={<ActivityPage />}
                                />
                                <Route path="boards" element={<BoardsPage />} />
                            </Route>
                            <Route path="*" element={<h1>Not Found</h1>} />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
