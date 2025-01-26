import React from "react"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import MainRoutes from './routes/MainRoutes'

const Layout: React.FC = () => {
    return (
        <>
            <Header/>
            <main>
                <img src="stars/starsTL.png" alt="starsTL" className="starsTL" />
                <img src="stars/starsTR.png" alt="starsTR" className="starsTR" />
                <img src="stars/starsBL.png" alt="starsBL" className="starsBL" />
                <img src="stars/starBR.png" alt="starBR" className="starBR" />
                <div className="main__container">
                    <MainRoutes />
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Layout