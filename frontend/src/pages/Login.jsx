import { Navigate } from "react-router-dom";
import CommonForm from "../component/CommonForm";
import { ENDPOINTS } from "../constants";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { authenticated } = useAuth();
    if (authenticated) return <Navigate to={ENDPOINTS.HOME.route} />;
    return (
        <CommonForm
            route={ENDPOINTS.LOGIN.route}
            action='login'
        />
    );
}
