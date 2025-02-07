import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Profile } from "../../Admin/components/Profile/Profile";

const ProfilePage: React.FC = observer(() => {
    const { userName } = useParams<{ userName: string }>();

    return (
        <>
            <Helmet>
                <title>Админка | {userName}</title>
            </Helmet>
            <Profile />
        </>
    )
})

export default ProfilePage