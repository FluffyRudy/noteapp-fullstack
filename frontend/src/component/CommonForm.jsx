import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useAuth } from "../context/AuthContext";

export default function CommonForm({ route, action }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const { setAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await API.post(route, { username, password });
            if (action === "login" && response.status === 200) {
                const { access, refresh } = response.data;
                localStorage.setItem(ACCESS_TOKEN, access);
                localStorage.setItem(REFRESH_TOKEN, refresh);
                setAuthenticated(true);
                navigate("/");
            } else if (action === "register" && response.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            const userExistError = error?.response?.data?.username[0];
            if (userExistError) setErrorMsg(userExistError);
            else setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (errorMsg != "") {
            setTimeout(() => {
                setErrorMsg("");
            }, 2000);
        }
    }, [errorMsg]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='flex justify-center items-center flex-col min-h-[80vh] text-black'>
            <h1 className='capitalize font-bold text-3xl text-white'>
                {action}
            </h1>
            <h1 className='capitalize font-bold text-1xl text-red-400'>
                {errorMsg}
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <input
                        className='w-[min(300px,90vw)] p-2 rounded'
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Username'
                        required
                    />
                    <input
                        className='w-[min(300px,90vw)] p-2 rounded mt-2'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                        required
                    />
                    <button
                        type='submit'
                        className='capitalize font-bold text-white bg-gray-700 mt-2'>
                        {action}
                    </button>
                </div>
            </form>
        </div>
    );
}
