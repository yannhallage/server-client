
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Authentification from "../pages/auth";
import Home from "../pages/home";
import ProtectedRoute from '../custom/ProtectedRoute'
import Signup from "../pages/signup";
import Notfound from "../pages/notfound"
import RedirectIfAuth from "../custom/RedirectIfAuth";


const Component_Router = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <RedirectIfAuth>
                            <Authentification />
                        </RedirectIfAuth>   
                    } />
                    <Route path="/home" element={
                        <ProtectedRoute >
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/create" element={
                        <ProtectedRoute >
                            <Signup />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<Notfound />} />
                </Routes>
            </Router>
        </>
    )
}
export default Component_Router;