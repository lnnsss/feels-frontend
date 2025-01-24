import './App.css'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Main from './components/Pages/MainPage'
import Users from './components/Pages/UsersPage'
import Posts from './components/Pages/PostsPage'
import Registration from './components/Pages/RegistrationPage'
import Login from './components/Pages/LoginPage'
import Footer from './components/Footer/Footer'
import Account from './components/Pages/AccountPage'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/Pages/NotFoundPage'

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

          <Route element={<ProtectedRoute isProtected={false} redirectTo="/account" />}>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute isProtected={true} redirectTo="/registration" />}>
            <Route path="/account" element={<Account />} />
          </Route>

          
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default App
