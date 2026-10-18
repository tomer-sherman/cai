import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../pages-area/home/home";
import { Page404 } from "../../pages-area/page404/page404";

export function Routing() {

    return (
        <Routes>

            {/* Default Route: */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Home: */}
            <Route path="/home" element={<Home />} />

            {/* Page not found: */}
            <Route path="*" element={<Page404 />} />

        </Routes>
    );
}
