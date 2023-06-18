"use client"

import { useEffect, useReducer, useState } from "react";
import NoteContext from "./NoteContext";
import dynamic from "next/dynamic";


const StateProvider = ({ children }) => {
    const [TokenSend, setTokenSend] = useState(null);
    return (
        <NoteContext.Provider value={{TokenSend , setTokenSend  }}>
            {children}
        </NoteContext.Provider>
    )
}
export default dynamic(()=> Promise.resolve(StateProvider),{ssr:false})
// export default StateProvider;











 // useEffect(()=>{
        // const allNotes = AllNotes_Fetch()
        // setNotes(allNotes)
    // })
 
    // // / // readNotes
    // async function readNotes() {
    //     const res = await fetch('https://notes-nodejs-vt.onrender.com/notes',{
         
    //       headers:{
    //         "Authorization":"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InZpc2hhbHRhdmF0YW1AZ21haWwuY29tIiwiaWQiOiI2NDgzOTI5YTQyNTE1ZWJjY2YyMDFkMjciLCJpYXQiOjE2ODY2OTAwNzl9.q4zq408Q_jv2YXQR_hqlTzuYJIsJNNEa_bHo2AAi8aY"
    //       },
         
    //     })
    //     if (!res.ok) { 
    //       throw new Error('Failed to fetch data')
    //     }
    //     const readNotes =  res.json()
    //     readNotes.then(function(result) {
    //         console.log(result) // "Some User token"
    //         setNotes(result)
    //      })         
       
    //   }
      


    // test 

