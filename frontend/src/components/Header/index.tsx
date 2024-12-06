import "./Header.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import auth from "../../hooks/auth";
import { useLoading } from "../../context/PageLoadingContext";

const Header = () => {
    const { user, logout, loading } = useAuth();
    const { setLoadingState} = useLoading();

    const handleLogout = () => {
        setLoadingState(true);
        auth.logout().then(() => {
            logout();
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoadingState(false);
        });
    }

    return (
        <div className="header">
            <NavLink className="logo" to="/">Movie Booking</NavLink>
            <nav>
                {!loading && (
                    <ul className="nav-link-container">
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                                to="/">
                                Home
                            </NavLink>
                        </li>
                        {!user ? (
                            <>
                                <li>
                                    <NavLink
                                        className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
                                        to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
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