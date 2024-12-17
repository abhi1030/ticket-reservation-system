import { useState } from "react";
import { NavLink } from "react-router-dom";
import auth from "../hooks/auth";
import { useLoading } from "../context/PageLoadingContext";
import { useAuth, User } from "../context/AuthContext";

const Signup = () => {
    const { setLoadingState } = useLoading();
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = () => {
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Please fill all fields");
        }
        setLoadingState(true);
        auth.register(name, email, password, confirmPassword)
            .then((response) => {
                console.log(response);
                const userData = response as User;
                login(userData);
            })
            .catch((error) => {
                alert(error.message);
            }).finally(() => {
                setLoadingState(false);
             });
    };

    return (
        <div className="signup-container">
            <h2 className="text-center">SignUp</h2>
            <div className="form">
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className="form-input" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} type="text" />
                </div>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input className="form-input" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                </div>
                <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input className="form-input" placeholder="Confirm Password..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
                </div>
                <button className="signup-btn" onClick={handleSignup}>SignUp</button>
            </div>
            <div className="login-link">Already have an account? <NavLink to="/login">Login</NavLink></div>
        </div>
    );
};

export default Signup;
