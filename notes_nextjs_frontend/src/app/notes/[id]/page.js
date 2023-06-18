"use client"

import DeleteNote from '@/components/Notes/DeleteNote';
import NotesComponent from '@/components/Notes/NotesComponent';
import NoteContext from '@/context/NoteContext';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import React, { useContext } from 'react'

async function findById_Note({ id, Token }) {
    const response = await fetch(`https://notesapp-nodejs-backend.onrender.com/notes/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": ` bearer ${Token}`
        },
    })
    const NotesDb = await response.json();
    return NotesDb
}

async function ID({ params }) {

    // // find Notes id
    const id = params.id
    // console.log(id)

    // token already login user
    const { TokenSend } = useContext(NoteContext)
    const Token = localStorage.getItem('NotesAppLoginToken') || TokenSend


    const res = await findById_Note({ id, Token })
    console.log(res)
    const { title, description } = res.onlyOneNote
    // // Delete Notes




    return (
        <div className='px-10  my-5 sm:my-10'>
            <div className='py-5 flex justify-center'>
                <Link href={'/notes'} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white'>ALL NOTES</Link>
                <Link href={'/createnotes'} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white'>CREATE NOTES</Link>
            </div>

            <div className='bg-gray-500 text-yellow-400 mx-3 my-2 p-2 sm:w-[20vw] md:w-[25vw] ' >
                <div>
                    <h1 className='text-2xl'>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className='flex justify-end'>
                    <DeleteNote id={id} />
                </div>

            </div>
            <>
                <NotesComponent id={id} title={title} description={description} />
            </>

        </div>
    )
}




export default dynamic(() => Promise.resolve(ID), { ssr: false })
// export default ID
