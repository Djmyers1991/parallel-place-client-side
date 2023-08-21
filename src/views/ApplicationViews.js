import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { TagList } from '../components/tag/TagList'
import { Authorized } from "./Authorized"
import { PostList } from "../components/posts/PostList"
import { UserPost } from "../components/posts/UserPost"
import { PostDetails } from "../components/posts/PostDetails"
import { CategoryList } from "../components/Categories/CategoryList"
import { UserList } from "../components/users/UserList"
import { PostForm } from "../components/posts/PostForm"
import { PostEdit } from "../components/posts/PostEdit"
import { UserDetail } from "../components/users/UserDetail"
import { PostComments } from "../components/comments/PostComments"
import { CommentForm } from "../components/comments/CommentForm"


import { ReactionList } from "../components/reactions/reactionList.js"
import { getUserByToken } from "../managers/tokens.js"
import { getUserById } from "../managers/users.js"
import { StaffViews } from "./StaffViews.js"
import { AuthorViews } from "./AuthorViews.js"
import { useEffect, useState } from "react"

//import { SubscribedUserPosts } from "../components/subscriptions/ViewSubscribedUserPosts"

export const ApplicationViews = ({ token, setToken }) => {
  token = localStorage.getItem("auth_token")
  const [user, setUser] = useState({})

  useEffect(() => {
    if (token) {
      getUserByToken(token)
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [token]);
  
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        {user?.is_staff !== 0 ? (
          <Route path="*" element={<StaffViews />} />
        ) : (
          <Route path="*" element={<AuthorViews />} />
        )}
      </Route>
    </Routes>
  );
}
