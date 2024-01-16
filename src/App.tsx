import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css';

import { LandingPage } from "./Pages/LandingPage/layout";
import { AuthProvider } from "react-auth-kit";

//Board components
import { BoardLayout } from "./Pages/Board/BoardLayout";

//AUTH COMPONENTS
import { Register } from "./Pages/Auth/Register";
import { Login } from "./Pages/Auth/Login";


import { DashboardLayout } from "./Pages/Dashboard/DashboardLayout";
import { Toaster } from "./Components/Toaster/toaster";
import { Settings } from "./Pages/Dashboard/pages/SettingsPage";
import { BoardsPage } from "./Pages/Dashboard/pages/BoardsPage";
import { ForgotPassword } from "./Pages/Auth/ForgotPassword";
import { ResetPassword } from "./Pages/Auth/ResetPassword";
import { ForgotPasswordSubmit } from "./Pages/Auth/ForgotPasswordSubmit";
import { useState } from "react";

function App() {

    //change this later
    const [resetEmail, setResetEmail] = useState('')


    return (
        <AuthProvider authType={"localstorage"} authName={"x-authorization"}>
            <Toaster />
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/landing" element={<LandingPage />} />
                        <Route
                            path="/board/:boardId"
                            element={<BoardLayout />}
                        />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/forgotPassword" element={<ForgotPassword setResetEmail={setResetEmail}/>} />
                        <Route path="/auth/forgotPassword/submit" element={<ForgotPasswordSubmit resetEmail={resetEmail}/>} />
                        <Route path="/auth/resetPassword" element={<ResetPassword />} />
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route path="settings" element={<Settings />} />
                            <Route path="boards" element={<BoardsPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;
