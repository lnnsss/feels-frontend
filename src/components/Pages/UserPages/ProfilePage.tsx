import React from "react"
import { Helmet } from "react-helmet"
import { Profile } from "../../Profile/Profile"
import { useParams } from "react-router-dom";

const ProfilePage: React.FC = () => {
    const { username } = useParams<{ username: string }>();

    return (
        <>
            <Helmet>
                <title>{username}</title>
            </Helmet>
            <Profile />
        </>
    )
}
export default ProfilePage