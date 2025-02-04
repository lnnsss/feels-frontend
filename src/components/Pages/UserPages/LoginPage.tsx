import React from "react"
import { Login } from "../../Login/Login"
import { Helmet } from "react-helmet"

const LoginPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Вход</title>
            </Helmet>
            <Login />
        </>
    )
}
export default LoginPage