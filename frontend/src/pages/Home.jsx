import { useEffect, useState } from "react";
import { API } from "../api";
import { NoteList } from "../component/NoteList";
import { ENDPOINTS } from "../constants";
import { Link } from "react-router-dom";

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
            <div className='flex justify-center'>
                <button className='inline-flex items-center justify-center w-[min(200px,90vw)] px-0 py-2 h-auto text-white rounded border-2 border-blue-500'>
                    <Link
                        to='/note/create'
                        className='w-full h-full flex items-center justify-center'>
                        Create
                    </Link>
                </button>
            </div>

            <NoteList />
        </>
    );
}
