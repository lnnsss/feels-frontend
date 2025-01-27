import React from "react"
import { Admin } from "../../Admin/Admin"
import { Helmet } from "react-helmet"

const AdminPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Админ панель</title>
            </Helmet>
            <Admin/>
        </>
    )
}

export default AdminPage