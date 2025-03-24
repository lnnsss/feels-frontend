import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from '../components/ProtectedRoute';
import Main from '../components/Pages/UserPages/MainPage';
import Users from '../components/Pages/UserPages/UsersPage';
import Posts from '../components/Pages/UserPages/PostsPage';
import Registration from '../components/Pages/UserPages/RegistrationPage';
import Login from '../components/Pages/UserPages/LoginPage';
import Account from '../components/Pages/UserPages/AccountPage';
import NotFound from '../components/Pages/UserPages/NotFoundPage';
import Profile from "../components/Pages/UserPages/ProfilePage";
import Chats from "../components/Pages/UserPages/ChatsPage";

const MainRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userName" element={<Profile />} />
            <Route path="/posts" element={<Posts />} />

            {/* Публичные маршруты для регистрации и входа */}
            <Route element={<ProtectedRoute isProtected={false} redirectTo="/account" />}>
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
            </Route>

            {/* Защищенные маршруты для обычных пользователей */}
            <Route element={<ProtectedRoute isProtected={true} redirectTo="/registration" />}>
                <Route path="/account" element={<Account />} />
                <Route path="/chats" element={<Chats />} />
            </Route>

            {/* Перенаправление для несуществующих страниц */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default MainRoutes;
