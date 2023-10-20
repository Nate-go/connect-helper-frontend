import { Routes, Route } from 'react-router-dom'

import { Home } from "@pages/home";
import { Login } from "@pages/authentication";

function BaseRouter() {
    return (
        <Routes>
            <Route path="/home" element={ <Home/>} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default BaseRouter