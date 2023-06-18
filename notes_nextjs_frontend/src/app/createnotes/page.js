"use client"
import NoteContext from '@/context/NoteContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'



// // Create Notes
async function CreateNotes({ InputText, Token }) {

    const response = await fetch(`https://notesapp-nodejs-backend.onrender.com/notes`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `bearer ${Token}`

        },
        body: JSON.stringify(InputText),
    })
    const data = await response.json();
    return data
}


function Crete_note() {
    const Router = useRouter()

    // token already login user
    const { TokenSend } = useContext(NoteContext)
    const Token = localStorage.getItem('NotesAppLoginToken') || TokenSend

    // // input access
    const [InputText, setInputText] = useState("");
    const Access_Input_box = (e) => {
        setInputText({ ...InputText, [e.target.name]: e.target.value })
    }
    /// // / create Notes
    const CreateNote = async (e) => {
        e.preventDefault();
        console.log(InputText)
        const Create_Notes_response = await CreateNotes({ InputText, Token })
        console.log(Create_Notes_response)
        console.log("create note")
        if (Create_Notes_response.success === true) {
            Router.push('/notes')
        } else {
            alert("Notes create ERROR")
        }
    }

    return (
        <>

            {
                Token ?
                    <>
                        <div className='px-10'>
                            <div className='flex justify-center'>
                                <Link href={'/notes'} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white'>ALL NOTES</Link>
                                <Link href={'/createnotes'} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white'>CREATE NOTES</Link>
                            </div>
                            <h1 className="text-center my-5">Create Notes</h1>
                            <form onSubmit={CreateNote} className='flex flex-col justify-center items-center'>
                                <textarea type="text" onChange={Access_Input_box} name="title" placeholder='title' className='p-2 my-3 w-[100%] sm:w-[50%] border border-2 border-orange-400' />
                                <textarea type="text" onChange={Access_Input_box} name="description" placeholder='description' className='p-2 my-3 w-[100%] sm:w-[50%] border border-2 border-orange-400' />
                                <button onClick={CreateNote} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white'>submit</button>
                            </form>
                        </div>
                    </>
                    : Router.push('/login')
            }
        </>
    )
}

export default Crete_note
