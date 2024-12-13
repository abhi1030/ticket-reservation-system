
import { useAuth } from "../context/AuthContext";
import Performance from "../components/Charts/Performance";
import { hasPermission } from "../lib/permission";
import MovieRecomendations from "../components/Movie/MovieRecomendations";
import UpcomingBookings from "../components/Movie/UpcomingBookings";

const Dashboard = () => {

    const { user } = useAuth();
    return (
        <div>
            <UpcomingBookings />
            {hasPermission(user, 'view performance') ? <Performance /> :<MovieRecomendations />}
        </div>
    );
};

export default Dashboard;
