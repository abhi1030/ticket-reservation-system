import "./Header.css";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/PageLoadingContext";
import auth from "../../hooks/auth";
import { SquareMenu } from "lucide-react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout, loading } = useAuth();
    const { setLoadingState } = useLoading();

    const closeMenu = () => {
        setMenuOpen(false);
    }

    const handleLogout = () => {
        setMenuOpen(false);
        setLoadingState(true);
        auth.logout().then(() => {
            logout();
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoadingState(false);
        });
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="header">
            <NavLink className="logo" to="/">Movie Booking</NavLink>
            <div className="toggle-menu-icon" onClick={toggleMenu}>
                <SquareMenu />
            </div>
            <nav className={`site-navigation ${menuOpen ? "menu-open" : ""}`}>
                {!loading && (
                    <ul className="nav-link-container">
                        <li>
                            <NavLink
                                onClick={closeMenu}
                                className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                                to="/">
                                Home
                            </NavLink>
                        </li>
                        {!user ? (
                            <>
                                <li>
                                    <NavLink
                                        onClick={closeMenu}
                                        className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                                        to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={closeMenu}
                                        className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                                        to="/signup">
                                        Signup
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink
                                        onClick={closeMenu}
                                        className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                                        to="/dashboard">
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                )}
            </nav>
        </div>
    );
}

export default Header;