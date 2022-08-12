import styles from "./Header.module.css";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-lg-5">
                <Link to="/" className="navbar-brand d-block d-lg-none">
                    <h1 className="m-0 display-5 text-capitalize font-italic text-white">
                        <span className={styles['custom-color']}>DoGroomig</span>
                    </h1>
                </Link>
                <button
                    type="button"
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                    title="home"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse justify-content-between px-3"
                    id="navbarCollapse"
                >
                    <div className="navbar-nav mr-auto py-0">
                        <Link to="/" className="nav-item nav-link">
                            Начало
                        </Link>
                        <Link to="/about" className="nav-item nav-link">
                            За нас
                        </Link>
                        <Link to="/catalog" className="nav-item nav-link">
                            Каталог
                        </Link>
                        <Link to="contact" className="nav-item nav-link">
                            Контакти
                        </Link>
                    </div>
                    {user.email && <span>{user.email}</span>}
                    {user.email
                        ?
                        <>
                            <Link to="/logout" className="btn btn-lg btn-primary px-3 d-none d-lg-block">
                                Logout
                            </Link>
                            <Link to="/create" className="btn btn-lg btn-primary px-3 d-none d-lg-block">
                                Създай пост
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/login" className="btn btn-lg btn-primary px-3 d-none d-lg-block">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-lg btn-primary px-3 d-none d-lg-block">
                                Register
                            </Link>
                        </>
                    }
                    <img src="img/lapa-2.png" alt="" className={styles['lapa']} />
                </div>
            </nav>
        </div>
    );
};