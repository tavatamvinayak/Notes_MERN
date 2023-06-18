"use client"

import { useRouter } from 'next/navigation';
import React, { useContext, useReducer, useState } from 'react'
import Cookies from 'js-cookie'
import NoteContext from '@/context/NoteContext';




function SignIn() {
    const router = useRouter()
    // // Token State access
    const [TokenAccess, setTokenAccess] = useState(null);
    // // context 
    const { TokenSend ,setTokenSend } = useContext(NoteContext)
    
    /// / / input access
    const [InputText, setInputText] = useState("");
    const inputField = (e) => {
        setInputText({ ...InputText, [e.target.name]: e.target.value })
    };
    /// login user sever fetch
    const LoginServer = async (e) => {
        e.preventDefault();
        const res = await fetch(`https://notesapp-nodejs-backend.onrender.com/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(InputText)
        })
        const response = await res.json();
        if (response.success === true) {
            localStorage.setItem('NotesAppLoginToken', response.token)
            router.push('/')
            setTokenAccess(response.token)
            setTokenSend(TokenAccess)
        } else {
            console.log(response.errors)
            alert( response.errors[0].msg || response.errors )
        }
        console.log(response)
    }
    // // user already login token
    const Token = localStorage.getItem('NotesAppLoginToken');
    if(Token!=null){ router.push('/')}

    return (
        <div className='px-10 my-10'>
            <h1 className='text-2xl text-center'>Login </h1>

            <form onSubmit={LoginServer} className='flex flex-col justify-center items-center'>
                <input type="Email" name='Email' placeholder='Email' onChange={inputField} className='p-2 my-3' />
                <input type="Password" name="Password" placeholder='Password' onChange={inputField} className='p-2 my-3' />
                <br /> <input type="button" value="Login" onClick={LoginServer} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white' />
            </form>


        </div>
    )
}

export default SignIn
