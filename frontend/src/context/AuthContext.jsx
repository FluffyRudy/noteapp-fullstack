import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api";
import { ACCESS_TOKEN, ENDPOINTS, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);

            if (!accessToken) {
                setAuthenticated(false);
                return;
            }

            try {
                const decodedToken = jwtDecode(accessToken);
                const expiration = decodedToken.exp;
                if (expiration < Date.now() / 1000.0) {
                    const newTokenIssue = await API.post(
                        ENDPOINTS.NEW_REFRESH_TOKEN,
                        {
                            refresh: refreshToken,
                        }
                    );
                    if (newTokenIssue.status === 200) {
                        const { access, refresh } = newTokenIssue.data;
                        localStorage.setItem(ACCESS_TOKEN, access);
                        localStorage.setItem(REFRESH_TOKEN, refresh);
                        setAuthenticated(true);
                    } else {
                        setAuthenticated(false);
                    }
                } else {
                    setAuthenticated(true);
                }
            } catch (error) {
                setAuthenticated(false);
                console.error(error);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ authenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
