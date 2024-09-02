import { NavLink, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { authenticated, setAuthenticated } = useAuth();
    const navigate = useNavigate();

    const navLinks = [
        { label: "home", route: "/", condition: authenticated },
        { label: "login", route: "/login", condition: !authenticated },
        { label: "register", route: "/register", condition: !authenticated },
    ];

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setAuthenticated(false);
        navigate("/login");
    };

    return (
        <header>
            <nav>
                <ul
                    className={`${
                        authenticated ? "justify-between" : "justify-center"
                    } flex  items-center capitalize sticky top-0`}>
                    {navLinks.map((navItem) => {
                        return navItem.condition ? (
                            <li
                                className='mx-2 font-bold text-2xl'
                                key={navItem.label}>
                                <NavLink to={navItem.route}>
                                    {navItem.label}
                                </NavLink>
                            </li>
                        ) : null;
                    })}
                    {authenticated && (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
