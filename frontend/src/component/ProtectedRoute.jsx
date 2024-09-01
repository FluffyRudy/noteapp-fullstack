import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
    const { authenticated } = useAuth();

    if (authenticated === null) return <div>Loading....</div>;
    return authenticated ? children : <Navigate to='/login' />;
}
