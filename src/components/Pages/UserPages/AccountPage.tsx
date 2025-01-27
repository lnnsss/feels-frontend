import React from "react"
import { Account } from "../../Account/Account"
import { Helmet } from "react-helmet";

const AccountPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Личный кабинет</title>
            </Helmet>
            <Account />
        </>
    )
}
export default AccountPage