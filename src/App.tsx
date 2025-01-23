import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import MainPage from './components/Pages/MainPage'
import UsersPage from './components/Pages/UsersPage'
import PostsPage from './components/Pages/PostsPage'
import RegistrationPage from './components/Pages/RegistrationPage'
import LoginPage from './components/Pages/LoginPage'

function App() {

  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
