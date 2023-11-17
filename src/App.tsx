import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./Pages/LandingPage/LandingPage";
import { AuthProvider } from "react-auth-kit";

//Board components
import { Board } from "./Pages/Board/Board";
import { Create } from "./Pages/Create/Create";

//A COMPONENTS
import { Register } from "./Pages/Auth/Register";
import { Login } from "./Pages/Auth/Login";







function App() {
    return (
        <AuthProvider
            authType={"localstorage"}
            authName={"access_info"}
        >
        {/* <DraggedItemProvider> */}
            <div className="App">
                
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/landing" element={<LandingPage />} />
                        <Route path="/board/create" element={<Create />} />
                        <Route path="/board/:id" element={<Board/>} />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/login" element={<Login/>} />
                    </Routes>
                    {/* <LandingPage></LandingPage> */}
                </BrowserRouter>
            </div>
        {/* </DraggedItemProvider> */}
        </AuthProvider>
    );
}

export default App;
