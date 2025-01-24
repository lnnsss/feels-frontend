import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Main from './components/Pages/MainPage'
import Users from './components/Pages/UsersPage'
import Posts from './components/Pages/PostsPage'
import Registration from './components/Pages/RegistrationPage'
import Login from './components/Pages/LoginPage'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <img src="stars/starsTL.png" alt="starsTL" className="starsTL" />
        <img src="stars/starsTR.png" alt="starsTR" className="starsTR" />
        <img src="stars/starsBL.png" alt="starsBL" className="starsBL" />
        <img src="stars/starBR.png" alt="starBR" className="starBR" />
        <div className="main__container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default App
