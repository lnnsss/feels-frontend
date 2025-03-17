import { Route, Routes } from "react-router-dom";
import Admin from "../components/Pages/AdminPages/AdminPage";
import NotFound from "../components/Pages/UserPages/NotFoundPage";
import Users from "../components/Pages/AdminPages/UsersPage";
import Posts from "../components/Pages/AdminPages/PostsPage";
import Profile from "../components/Pages/AdminPages/ProfilePage";

const AdminRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/users/:userName" element={<Profile />} />
            <Route path="/admin/posts" element={<Posts />} />

            {/* Перенаправление для несуществующих страниц */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AdminRoutes;
