import { BrowserRouter, Route, Routes } from "react-router";
 import { ToastContainer } from 'react-toastify';
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";


function App() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
