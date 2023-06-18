"use client"
import NoteContext from '@/context/NoteContext'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

function DeleteNote({ id }) {
    const router = useRouter()

    // token already login user
    const { TokenSend } = useContext(NoteContext)
    const Token = localStorage.getItem('NotesAppLoginToken') || TokenSend


    const deleteNotes = async (e) => {
        console.log("delete")
        e.preventDefault()
        console.log("delete")
        const response = await fetch(`https://notesapp-nodejs-backend.onrender.com/notes/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": ` bearer ${Token}`
            }
        })
        const deleteNote = response.json()
        console.log(deleteNote)
        router.push('/notes')

    }
    return (
        <>
            <button onClick={deleteNotes} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white text-white ' > delete Note </button>

        </>
    )
}

export default DeleteNote
