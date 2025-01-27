import React from "react"
import { Users } from "../../Users/Users"
import { Helmet } from "react-helmet"

const UsersPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Пользователи</title>
            </Helmet>
            <Users />
        </>
    )
}
export default UsersPage