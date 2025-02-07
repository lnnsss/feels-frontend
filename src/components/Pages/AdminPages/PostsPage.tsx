import React from "react"
import { Helmet } from "react-helmet"
import { Posts } from "../../Admin/components/Posts/Posts"

const PostsPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Админка | Посты</title>
            </Helmet>
            <Posts />
        </>
    )
}
export default PostsPage