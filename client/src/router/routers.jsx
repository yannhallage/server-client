
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentification from "../pages/auth";
import Home from "../pages/home";
import Notfound from "../pages/notfound"


const Component_Router = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Authentification />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Notfound />} />
                </Routes>
            </Router>
        </>
    )
}
export default Component_Router;