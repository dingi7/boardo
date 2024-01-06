import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';


import { LandingPage } from './Pages/LandingPage/layout';
import { AuthProvider } from 'react-auth-kit';

//Board components
import { Board } from './Pages/Board/Board';
import { BoardLayout } from './Pages/Board/Layout';

//AUTH COMPONENTS
import { Register } from './Pages/Auth/Register';
import { Login } from './Pages/Auth/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dashboard } from './Pages/Dashboard/Dashboard';


function App() {
    return (
        <AuthProvider authType={'localstorage'} authName={'x-authorization'}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/landing" element={<LandingPage />} />
                        <Route path="/board/:boardId" element={<BoardLayout/>} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/login" element={<Login />} />

                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;
