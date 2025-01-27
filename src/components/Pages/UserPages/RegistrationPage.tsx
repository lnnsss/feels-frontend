import React from "react"
import { Registration } from "../../Registration/Registration"
import { Helmet } from "react-helmet"

const RegistrationPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Регистрация</title>
            </Helmet>
            <Registration />
        </>
    )
}
export default RegistrationPage