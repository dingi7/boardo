import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { LandingPage } from './Pages/LandingPage/LandingPage';
import { Board } from './Pages/Board/Board';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                <Route path='/' element={<LandingPage/>}/>
                  <Route path='/landing' element={<LandingPage/>}/>
                  <Route path='/board/:id' element={<Board/>}/>
                </Routes>
                {/* <LandingPage></LandingPage> */}
            </BrowserRouter>
        </div>
    );
}

export default App;
