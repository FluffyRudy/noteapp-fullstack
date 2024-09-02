import { useEffect, useState } from "react";
import { API } from "../api";
import { NoteList } from "../component/NoteList";
import { ENDPOINTS } from "../constants";

export default function Home() {
    const [username, setUsername] = useState("User");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const messageResponse = await API.get(ENDPOINTS.HOME.route);
                if (messageResponse.status === 200)
                    setUsername(messageResponse.data.message);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div>
                <h1 className='text-2xl font-bold  mb-4  w-full text-center text-white'>
                    Welcome, <span className='text-red-600'>{username}!</span>
                </h1>
            </div>
            <NoteList />
        </>
    );
}
