import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { LandingPage } from './Pages/LandingPage/LandingPage';
import { AuthProvider } from 'react-auth-kit';

//Board components
import { Board } from './Pages/Board/Board';
import { Create } from './Pages/Create/Create';

//AUTH COMPONENTS
import { Register } from './Pages/Auth/Register';
import { Login } from './Pages/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
            {/* <DraggedItemProvider> */}
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/landing" element={<LandingPage />} />
                        <Route path="/board/create" element={<Create />} />
                        <Route path="/board/:id" element={<Board />} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/login" element={<Login />} />
                    </Routes>
                    {/* <LandingPage></LandingPage> */}
                </BrowserRouter>
            </div>
            {/* </DraggedItemProvider> */}
        </AuthProvider>
    );
}

export default App;
