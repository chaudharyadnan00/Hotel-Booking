import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
const ProfilePage = () => {
    const [redirect, setRedirect] = useState(null);
    const { user, setUser, ready } = useContext(UserContext);

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    const logout = async () => {
        try {
            await axios.post('/logout');
            setUser(null);
            setRedirect('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
    if (!ready&&!user) {
        return 'Loading...';
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' &&
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            }
            {subpage === 'places' &&
                (<PlacesPage />)
            }
        </div>
    );
};
export default ProfilePage;