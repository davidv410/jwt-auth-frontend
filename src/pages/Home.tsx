import { useNavigate } from "react-router-dom"
import { logoutUser } from "../features/auth/api"
import { useAuth } from "../features/auth/Context"

export const Home = () => {
    const navigate = useNavigate()
    const { user, logout } = useAuth();


    const handleLogout = async () => {
      try {
        await logoutUser();
        logout();
      } catch (err) {
        console.log(err);
      }
    };


    return(
        <>
            { user ?
            <>
                <p>{user.name}</p>
                <button onClick={handleLogout}>logout</button>
            </>
            :
            <>
                <button onClick={() => navigate('/login')}>login</button>
                <button onClick={() => navigate('/register')}>register</button>
            </>
            }
        </>
    )
}