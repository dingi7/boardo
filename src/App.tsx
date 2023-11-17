import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { Board } from "./Pages/Board/Board";
import { AuthProvider } from "react-auth-kit";
import { Register } from "./Pages/Auth/Register";






function App() {
    return (
        <AuthProvider
            authType={"localstorage"}
            authName={"access_info"}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}
        >
        {/* <DraggedItemProvider> */}
            <div className="App">
                
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/landing" element={<LandingPage />} />
                        <Route path="/board/:id" element={<Board />} />
                        <Route path="/auth/register" element={<Register />} />
                    </Routes>
                    {/* <LandingPage></LandingPage> */}
                </BrowserRouter>
            </div>
        {/* </DraggedItemProvider> */}
        </AuthProvider>
    );
}

export default App;
