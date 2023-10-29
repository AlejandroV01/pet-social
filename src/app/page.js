'use client'
import Link from 'next/link'
import { useState } from 'react'
import Feed from './_components/Feed/Feed'
import Login from './_components/Login/Login'
import Navbar from './_components/Navbar/Navbar'
export default function Home() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <>{isAuth ? <Feed /> : <Login />}</>
    // TODO: Complete a functioning home page
  )
}
