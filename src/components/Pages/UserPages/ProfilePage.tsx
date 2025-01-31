import React from "react"
import { Helmet } from "react-helmet"
import { Profile } from "../../Profile/Profile"
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

const ProfilePage: React.FC = observer(() => {
    const { userName } = useParams<{ userName: string }>();

    return (
        <>
            <Helmet>
                <title>{userName}</title>
            </Helmet>
            <Profile />
        </>
    )
})

export default ProfilePage