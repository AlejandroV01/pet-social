import { Inter } from 'next/font/google'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './_components/Navbar/Navbar'
import HydrationZustand from './_util/HydrationZustand'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pet Social',
  description: 'Pet Social Media App',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className=' '>
      <body className={`${inter.className} flex flex-col items-center`}>
        <Navbar />
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
