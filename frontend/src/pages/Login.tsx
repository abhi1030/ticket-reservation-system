import { useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import auth from "../hooks/auth";
import { useAuth, User } from "../context/AuthContext";
import { useLoading } from "../context/PageLoadingContext";

const Login = () => {
    const { login } = useAuth();
    const { setLoadingState } = useLoading();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

        if (email === "" || password === "") {
            toast.error("Please enter email and password");
            return;
        }
        setLoadingState(true);
        auth.login(email, password).then((response) => {
            const userData = response as User;
            login(userData);
        }).catch((error) => {
            console.log(error);
            toast.error(error.response.data.message);
        }).finally(() => {
            setLoadingState(false);
        });
    };


    return (
        <div className="login-container">
            <h2 className="text-center">Login</h2>
            <div className="form">
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input className="form-input" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                </div>
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
            <div className="register-link">Don't have an account? <NavLink to="/signup">Register</NavLink></div>
        </div>
    );
};

export default Login;
