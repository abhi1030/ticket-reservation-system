import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

    const { user } = useAuth();
    return (
        <div>
            <h1>Welcome to the Movie Booking System</h1>
            <p>Hello {user?.name}!</p>

        </div>
    );
};

export default Dashboard;
