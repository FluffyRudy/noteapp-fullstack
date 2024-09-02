import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";
import { ENDPOINTS } from "../constants";

export default function NoteDetailUpdate() {
    const { noteID } = useParams();
    const [note, setNote] = useState({ title: "", content: "", id: "" });
    const [isEdited, setIsEdited] = useState(false);
    const titleInputRef = useRef(null);

    if (typeof noteID != "string" || isNaN(parseFloat(noteID))) {
        return <h1>Invalid Note</h1>;
    }

    const handleEdit = () => {
        setIsEdited(true);
    };

    const handleUpdate = async () => {
        if (isEdited) {
            await updateNote();
        }
    };

    const updateNote = async () => {
        const updatedNote = await API.put(
            `${ENDPOINTS.NOTE_LIST.route}${noteID}/`,
            {
                title: note.title,
                content: note.content,
            }
        );
        setIsEdited(false);
        console.log("Note updated successfully");
    };

    useEffect(() => {
        if (isEdited && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isEdited]);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const noteResponse = await API.get(
                    `${ENDPOINTS.NOTE_LIST.route}${noteID}`
                );
                const { title, content, id } = noteResponse.data;
                setNote({ title, content, id });
            } catch (error) {
                console.error(error);
            }
        };
        fetchNote();
    }, [noteID]);

    return (
        <div className='flex justify-center items-center flex-col min-h-[90vh]'>
            <div className='text-center'>
                <input
                    className='font-bold text-3xl text-blue-400 block text-center outline-none bg-transparent'
                    value={note.title}
                    disabled={!isEdited}
                    onChange={(e) =>
                        setNote((prevContent) => ({
                            ...prevContent,
                            title: e.target.value,
                        }))
                    }
                    ref={titleInputRef}
                />
                <input
                    className='font-bold text-2xl text-white inherited-bg block w-full text-center outline-none'
                    value={note.content}
                    disabled={!isEdited}
                    onChange={(e) =>
                        setNote((prevContent) => ({
                            ...prevContent,
                            content: e.target.value,
                        }))
                    }
                />
                <button
                    className='block w-full text-xl'
                    onClick={() => {
                        if (isEdited) {
                            handleUpdate();
                        } else {
                            handleEdit();
                        }
                    }}>
                    {isEdited ? "Update" : "Edit"}
                </button>
            </div>
        </div>
    );
}
