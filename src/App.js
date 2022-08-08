import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import { PostContext } from "./contexts/PostContext";

import * as postService from './services/postService';

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Contact } from "./components/Contact/Contact";
import { Home } from "./components/Home/Home";
import { Blog } from "./components/Blog/Blog";

import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register/Register";
import { UserProfile } from "./components/UserProfile/UserProfile";

import { useLocalStorage } from "./hooks/useLocalStorage";
import CreatePost from "./components/CreatePost/CreatePost";
import Catalog from "./components/Catalog/Catalog";
import Details from "./components/Details/Details";

function App() {
    const [posts, setPosts] = useState([]);
    const [auth, setAuth] = useLocalStorage('auth', {});

    useEffect(() => {
        postService.getAll()
        .then(result => {
            setPosts(result);
        })
    }, []);

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };

    const postAdd = (postData) => {
        setPosts(state => [
            ...state,
            postData
        ]);

        // Navigate('/catalog');
    }

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div className="App">

                <Header />
                <PostContext.Provider value={{posts, postAdd}}>
                    <Routes>
                        <Route path="/" element={<Home posts={posts}/>} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/create" element={<CreatePost />} />
                        <Route path='/profile' element={<UserProfile />} />
                        <Route path='/catalog' element={<Catalog posts={posts} />} />
                        <Route path='/catalog/:postId' element={<Details posts={posts} />} />
                    </Routes>
                </PostContext.Provider>
                <Footer />

            </div>
        </AuthContext.Provider>
    );
}

export default App;
