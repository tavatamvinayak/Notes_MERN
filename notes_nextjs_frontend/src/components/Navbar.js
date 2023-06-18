"use client"
import NoteContext from '@/context/NoteContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import Cookies from 'js-cookie'
function Navbar() {
    const router = useRouter()
    // // context
    const { TokenSend, setTokenSend } = useContext(NoteContext);
    const Token = TokenSend
    const LogOut = () => {
        localStorage.removeItem('NotesAppLoginToken')
        router.push('/login')
        setTokenSend(null)
    }
    setTokenSend(localStorage.getItem('NotesAppLoginToken'))
    return (
        <>
            <header className='flex justify-between py-10 px-10'>
                <div> <h1 className="text-2xl"><Link href={'/'}>Notes App</Link></h1> </div>
                <nav>
                    {
                        Token ?
                            <>
                                <Link href={`/notes`} className='m-2 cursor-pointer bg-black text-white' > All Notes</Link>
                                <Link href={`/createnotes`} className='m-2 cursor-pointer bg-black text-white' > createNotes</Link>

                            </>
                            :
                            <>
                                <h1 className=''> Go First Login </h1>
                            </>
                    }
                    {
                        Token ?
                            <>
                                <button onClick={LogOut} className='m-2 cursor-pointer bg-black text-white' >LogOut</button>
                            </> :
                            <>
                                <Link href={`/login`} className='m-2 cursor-pointer bg-black text-white' >Login</Link>
                                <Link href={`/signup`} className='m-2 cursor-pointer bg-black text-white' >signup</Link>
                            </>
                    }

                </nav>
            </header>
        </>
    )
}

export default Navbar
