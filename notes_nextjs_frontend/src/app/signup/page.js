"use client"
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import Cookies from 'js-cookie'
import NoteContext from '@/context/NoteContext';
function SignUp() {
  const router = useRouter()

  // // Token State access
  const [TokenAccess, setTokenAccess] = useState(null);
  // // Context
  const { TokenSend, setTokenSend } = useContext(NoteContext);
  


  // // input text access
  const [InputText, setInputText] = useState("");
  const inputField = (e) => {
    setInputText({ ...InputText, [e.target.name]: e.target.value })
  };

  // // signup user create in server 
  const SignupServer = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NOTES_BACKEND_URL || `http://localhost:8080`}/signup`, {
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
    }
    console.log(response)
  }

  const Token = TokenSend;
  if(Token!=null){ router.push('/notes')}


  return (
    <div className='px-10 my-10'>
      <h1 className='text-2xl text-center'>Signup </h1>
      <form onSubmit={SignupServer} className='flex flex-col justify-center items-center' >
        <input type="text" name='FullName' placeholder='Full Name' onChange={inputField} className='p-2 my-3' />
        <input type="Email" name='Email' placeholder='Email' onChange={inputField} className='p-2 my-3' />
        <input type="Password" name="Password" placeholder='Password' onChange={inputField} className='p-2 my-3' />
        <br /> <input type="button" value="Signup" onClick={SignupServer} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white' />
      </form>
    </div>
  )
}

export default SignUp
