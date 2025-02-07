import React from "react"
import { Helmet } from "react-helmet"
import { Users } from "../../Admin/components/Users/Users"

const UsersPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Админка | Пользователи</title>
            </Helmet>
            <Users />
        </>
    )
}
export default UsersPage