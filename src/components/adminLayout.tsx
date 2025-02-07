import React from "react"
import AdminRoutes from "../routes/AdminRoutes"
import Header from "./Admin/components/Header/Header"

const AdminLayout: React.FC = () => {
    return (
        <>
        <Header/>
        <main>
            <AdminRoutes />
        </main>
        </>
    )
}

export default AdminLayout