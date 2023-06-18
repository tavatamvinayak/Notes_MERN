"use client"


import React, { useContext, useEffect } from 'react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import NoteContext from '@/context/NoteContext';
import Link from 'next/link';



async function AllNotes_Fetch({ Token }) {
    if (Token) {
        const response = await fetch(`https://notesapp-nodejs-backend.onrender.com/notes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `bearer ${Token}`
            },
        })
        const NotesDb = await response.json();
        return NotesDb
    } else {
        console.log("token remove logOut")
    }
}

async function Notes() {
    const router = useRouter()

    // token already login user
    const { TokenSend } = useContext(NoteContext)
    const Token = localStorage.getItem('NotesAppLoginToken') || TokenSend




    // // fetch calls
    const res = await AllNotes_Fetch({ Token });
    // console.log(res)

    function openNote(id) {
        router.push(`/notes/${id}`)
    }


    return (
        <>
            <section className='px-10 my-5'>
                <div className='flex justify-center'>
                    <Link href={'/notes'} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white'>ALL NOTES</Link>
                    <Link href={'/createnotes'} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white'>CREATE NOTES</Link>
                </div>
                <h1 className="text-center my-4">ALL Notes</h1>
                <>
                    <section className="text-gray-600 body-font">
                        <div className="container  py-20 mx-auto">
                            <div className="flex flex-wrap -m-4">

                                {
                                    Token != null
                                        ?
                                        res.map((e, i) => {
                                            return (
                                                <>
                                                    <div className="p-4 md:w-1/3" onClick={() => openNote(e._id)} key={i}>
                                                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                                            <div className="p-6">
                                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{e.title} </h1>
                                                                <p className="leading-relaxed mb-3"> {e.description} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                        )
                                        : router.push('/login')
                                }

                            </div>
                        </div>
                    </section >
                </>



            </section >
        </>
    )
}


export default dynamic(() => Promise.resolve(Notes), { ssr: false });

