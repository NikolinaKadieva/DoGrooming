import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { PostProvider } from "./contexts/PostContext";
import Notification from './components/Notification/Notification';
import PrivateRoute from "./components/Common/PrivateRoute";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Contact } from "./components/Contact/Contact";
import { Home } from "./components/Home/Home";

import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";

import CreatePost from "./components/CreatePost/CreatePost";
import Catalog from "./components/Catalog/Catalog";
import Details from "./components/Details/Details";
import EditPost from "./components/EditPost/EditPost";
import About from "./components/About/About";
import PostOwner from "./components/Common/PostOwner";
import { NotificationProvider } from "./contexts/NotificationContext";

const Register = lazy(() => import("./components/Register/Register"));

function App() {

    return (
        <AuthProvider>
            <NotificationProvider>
            <div className="App">
            <Notification />
                <Header />
                <PostProvider >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/register" element={
                            <Suspense fallback={<span>Loading...</span>}>
                                <Register />
                            </Suspense>
                        } />
                        <Route path="/login" element={<Login />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/create" element={(<PrivateRoute><CreatePost /></PrivateRoute>)} />
                        <Route element={<PostOwner />}>
                            <Route path="/posts/:postId/edit" element={<EditPost />} />
                        </Route>
                        <Route element={<PrivateRoute />}>
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                        <Route path='/catalog' element={<Catalog />} />
                        <Route path='/catalog/:postId' element={<Details />} />
                    </Routes>
                </PostProvider>
                <Footer />
            </div>
            </NotificationProvider>
        </AuthProvider>
    );
}

export default App;
