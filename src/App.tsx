import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { LandingPage } from './Pages/LandingPage/LandingPage';
import { Board } from './Pages/Board/Board';
import { AuthProvider } from 'react-auth-kit';

function App() {
    return (
        <AuthProvider
            authType={'localstorage'}
            authName={'access_info'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === 'https:'}
        >
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/landing" element={<LandingPage />} />
                        <Route path="/board/:id" element={<Board />} />
                    </Routes>
                    {/* <LandingPage></LandingPage> */}
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;
