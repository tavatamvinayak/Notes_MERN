"use client"
import NoteContext from '@/context/NoteContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

function HomeSection() {
    const router = useRouter()

    // // Token 
    const {TokenSend , setTokenSend } = useContext(NoteContext)
    setTokenSend(localStorage.getItem('NotesAppLoginToken'))


    /// logOut
    const LogOut = () => {
        localStorage.removeItem('NotesAppLoginToken')
        setTokenSend(null)
        router.push('/login')
    }
    const Token = TokenSend
    return (
        <>
            {

                Token ?
                    <>
                        <Link href={'/notes'} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white'>ALL NOTES</Link>
                        <Link href={'/createnotes'} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white'>CREATE NOTES</Link>

                    </>
                    : <> Go to First Login </>
            }
            {
                !Token ?
                    <>
                        <Link href={'/login'} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white'>LOGIN</Link>
                        <Link href={'/signup'} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white'>SIGNUP</Link>

                    </>
                    :
                    <>
                        <button onClick={LogOut} className='m-2 cursor-pointer bg-black text-white' >LogOut</button>

                    </>
            }
        </>
    )
}

export default HomeSection
