import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../components/Pages/AdminPages/AdminPage";
import NotFound from "../components/Pages/UserPages/NotFoundPage";

const AdminRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path="/admin" element={<Admin />} />

            {/* Перенаправление для несуществующих страниц */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AdminRoutes;
