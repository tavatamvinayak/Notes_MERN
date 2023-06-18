
import HomeSection from '@/components/HomeSection'

import React from 'react'


async function Home() {
  console.log(process.env.NOTES_BACKEND_URL)

  return (
    <>
      <main className='px-10 my-10'>
        <div className='flex flex-col justify-center items-center'>
          Home
         <HomeSection />

        </div>
      </main>
    </>
  )
}


export default Home
