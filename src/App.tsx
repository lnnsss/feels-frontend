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
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
