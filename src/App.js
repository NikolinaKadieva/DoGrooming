import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";


import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Contact } from "./components/Contact/Contact";
import { Home } from "./components/Home/Home";
import { Blog } from "./components/Blog/Blog";

import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register/Register";

import { useLocalStorage } from "./hooks/useLocalStorage"

function App() {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };

    return (
        <AuthContext.Provider value={{user: auth, userLogin, userLogout}}>
            <div className="App">
                <Header></Header>

                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/blog" element={<Blog></Blog>}></Route>
                    <Route path="/register" element={<Register></Register>}></Route>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/logout" element={<Logout />}></Route>
                    <Route path="/contact" element={<Contact></Contact>}></Route>
                </Routes>
                <Footer></Footer>

            </div>
        </AuthContext.Provider>
    );
}

export default App;
