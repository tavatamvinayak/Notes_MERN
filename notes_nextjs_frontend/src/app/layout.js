import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import StateProvider from '@/context/NoteState'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Notes App',
  description: 'Online Notes App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <>
        <StateProvider>

          <Navbar/>
          <>
            {children}
          </>

        </StateProvider>

        </>


      </body>
    </html>
  )
}
