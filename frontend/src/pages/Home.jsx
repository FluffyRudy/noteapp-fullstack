import { useEffect, useState } from "react";
import { API } from "../api";
import { ENDPOINTS } from "../constants";

export default function Home() {
    const [username, setUsername] = useState("User");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(ENDPOINTS.HOME.route);
                if (response.status === 200) setUsername(response.data.message);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='text-center bg-white p-8 rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold text-gray-900 mb-4'>
                    Welcome, <span className='text-red-600'>{username}!</span>
                </h1>
                <p className='text-gray-600'>
                    This is your home page. Enjoy your stay Dattebayo!
                </p>
            </div>
        </div>
    );
}
