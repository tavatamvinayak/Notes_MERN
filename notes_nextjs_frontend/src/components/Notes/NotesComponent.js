"use client"
import NoteContext from '@/context/NoteContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useRef, useState } from 'react'

function NotesComponent({id , title , description}) {
    const router = useRouter()
    // console.log(id)

      // token already login user
      const { TokenSend } = useContext(NoteContext)
      const Token = localStorage.getItem('NotesAppLoginToken') || TokenSend
  
   
 
  /// input access
    const [Text, setText] = useState("");
    const InputField = (e)=>{
        // console.log("text")
        setText({...Text ,[e.target.name]:e.target.value})
    }
    // // update note
    const Update= async (e)=>{
        e.preventDefault()
        console.log(Text)
        console.log("update")
        const response = await fetch(`http://localhost:8080/notes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": ` bearer ${Token}`
            },body:JSON.stringify(Text)
        })
        const update = response.json()
        console.log(update)
        router.push('/notes')
    }
  return (
    <div  className='py-10 my-5'>
      <form onSubmit={Update} className='flex flex-col justify-center items-center' >
        <textarea name="title" defaultValue={title} onChange={InputField}  placeholder='Title Edit' className='p-2 my-3 border border-2 border-orange-400 w-[100%]' ></textarea>
        <textarea name="description" defaultValue={description} onChange={InputField}   placeholder='Description Edit' className='p-2 my-3 border border-2 border-orange-400 w-[100%]'></textarea>
        <input type="button" value="update" onClick={Update} className='border border-2 border-black p-3 my-2 hover:bg-black hover:text-white' />
      </form>
    </div>
  )
}

export default NotesComponent




