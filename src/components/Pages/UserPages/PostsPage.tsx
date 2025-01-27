import React from "react"
import { Posts } from "../../Posts/Posts"
import { Helmet } from "react-helmet"

const PostsPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Посты</title>
            </Helmet>
            <Posts/>
        </>
    )
}
export default PostsPage