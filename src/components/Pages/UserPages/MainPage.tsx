import React from "react"
import { Main } from "../../Main/Main"
import { Helmet } from "react-helmet"

const MainPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Главная</title>
            </Helmet>
            <Main />
        </>
    )
}
export default MainPage