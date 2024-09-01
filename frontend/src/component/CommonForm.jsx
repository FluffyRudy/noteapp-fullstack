import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export default function CommonForm({ route, action }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await API.post(route, { username, password });
            if (action === "login" && response.status === 200) {
                const { access, refresh } = response.data;
                localStorage.setItem(ACCESS_TOKEN, access);
                localStorage.setItem(REFRESH_TOKEN, refresh);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(true);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className='capitalize'>{action}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                />
                <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                />
                <button
                    type='submit'
                    className='capitalize'>
                    {action}
                </button>
            </form>
        </div>
    );
}
