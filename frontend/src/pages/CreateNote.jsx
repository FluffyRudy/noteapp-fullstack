import { useState } from "react";
import { API } from "../api";
import { ENDPOINTS } from "../constants";

export default function CreateNote() {
    const [note, setNote] = useState({ title: "", content: "" });

    const handleCreate = async () => {
        try {
            const newNote = await API.post(ENDPOINTS.NOTE_CREATE.route, {
                ...note,
            });
            if (newNote.status === 201) {
                alert("created");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex justify-center items-center flex-col min-h-[90vh]'>
            <div className='text-center'>
                <input
                    required
                    minLength='4'
                    placeholder='Enter title'
                    className='font-bold text-3xl text-white block text-center outline-none bg-transparent border-white rounded-md border-2'
                    value={note.title}
                    onChange={(e) =>
                        setNote((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                />
                <textarea
                    required
                    rows='10'
                    minLength='4'
                    placeholder='Enter content'
                    className='font-bold text-2xl text-white inherited-bg block w-full text-center outline-none border-white border-2 rounded-md bg-black mt-2'
                    value={note.content}
                    onChange={(e) =>
                        setNote((prev) => ({
                            ...prev,
                            content: e.target.value,
                        }))
                    }
                />
                <button
                    className='block w-full text-xl border-2 border-green-400 rounded-md mt-2'
                    onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    );
}
