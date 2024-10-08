import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../api";
import { ENDPOINTS } from "../constants";

export function NoteList() {
    const [notes, setNotes] = useState([]);
    const [pages, setPages] = useState({
        next: null,
        previous: null,
    });

    const fetchNotes = async (page = 1) => {
        try {
            const response = await API.get(
                `${ENDPOINTS.NOTE_LIST.route}?page=${page}`
            );
            if (response.status === 200 && response.data.results) {
                setNotes(response.data.results);
                setPages({
                    next: response.data.next,
                    previous: response.data.previous,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchNotes();
    }, []);

    const handleNextPage = async () => {
        if (pages.next) {
            const nextPage = Number(
                new URL(pages.next).searchParams.get("page")
            );
            fetchNotes(nextPage);
        }
    };

    const handlePreviousPage = async () => {
        if (pages.previous) {
            const previousPage =
                Number(new URL(pages.previous).searchParams.get("page")) || 1;

            fetchNotes(previousPage);
        }
    };

    const handleDelete = async (e, note_id) => {
        try {
            const response = await API.delete(
                `${ENDPOINTS.NOTE_DELETE.route}${note_id}/`
            );
            if (response.status === 204) {
                fetchNotes();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container mx-auto py-8'>
            <h2 className='text-3xl font-bold mb-6'>Notes</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {notes.length === 0 ? (
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <p className='text-gray-500'>No notes found</p>
                    </div>
                ) : (
                    notes.map((note) => (
                        <div
                            key={note.id}
                            className='p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center'>
                            <h3 className='text-xl font-bold  mb-2 text-gray-300'>
                                {note.title}
                            </h3>
                            <p className='mb-4 text-gray-200'>{note.content}</p>
                            <div className='flex justify-between'>
                                <button className='bg-blue-500'>
                                    <Link
                                        to={`/note/${note.id}`}
                                        className='text-blue-100 hover:text-blue-700 transition-colors duration-300 '>
                                        View Note
                                    </Link>
                                </button>
                                <button
                                    className='bg-red-500 text-gray-500'
                                    onClick={(e) => handleDelete(e, note.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {notes.length > 0 ? (
                <div className='flex justify-around mt-8'>
                    <button
                        onClick={handlePreviousPage}
                        className=' px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        className=' px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                        Next
                    </button>
                </div>
            ) : null}
        </div>
    );
}
