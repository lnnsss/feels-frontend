import headerStore from "./header-store"
import modalStore from "./modal-store";
import postStore from "./post-store";
import postsStore from "./posts-store";
import profilePostStore from "./profile-post-store";
import profileStore from "./profile-store";
import tokenStore from "./token-store";
import userStore from "./user-store";
import usersStore from "./users-store";

class RootStore {
    header = headerStore
    modal = modalStore
    post = postStore
    posts = postsStore
    profilePost = profilePostStore
    profile = profileStore
    token = tokenStore
    user = userStore
    users = usersStore
}

export default RootStore;