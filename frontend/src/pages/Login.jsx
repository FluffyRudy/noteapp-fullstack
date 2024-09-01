import CommonForm from "../component/CommonForm";
import { ENDPOINTS } from "../constants";

export default function Login() {
    return (
        <CommonForm
            route={ENDPOINTS.LOGIN.route}
            action='login'
        />
    );
}
