import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';


import { LandingPage } from './Pages/LandingPage/layout';
import { AuthProvider } from 'react-auth-kit';

//Board components
import { BoardLayout } from './Pages/Board/Layout';

//AUTH COMPONENTS
import { Register } from './Pages/Auth/Register';
import { Login } from './Pages/Auth/Login';

import 'react-toastify/dist/ReactToastify.css';

import { DashboardLayout } from './Pages/Dashboard/Layout';
import { Toaster } from './Components/Toaster/toaster';


function App() {
    return (
        <AuthProvider authType={'localstorage'} authName={'x-authorization'}>
            <Toaster/>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/landing" element={<LandingPage />} />
                        <Route path="/board/:boardId" element={<BoardLayout/>} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/login" element={<Login />} />

                        <Route path="/dashboard" element={<DashboardLayout />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;
