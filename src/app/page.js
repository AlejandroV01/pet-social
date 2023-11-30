'use client'
import Link from 'next/link'
import { useState } from 'react'
import Feed from './_components/Feed/Feed'
import Login from './_components/Login/Login'
import Navbar from './_components/Navbar/Navbar'
import { useGlobalStore } from './_util/store'
export default function Home() {
  const fullProfile = useGlobalStore(state => state.profile_full)
  const isAuth = useGlobalStore(state => state.profile_full.profile !== null)
  console.log(isAuth)
  return (
    <>{isAuth ? <Login /> : <Login />}</>
    // TODO: Complete a functioning home page
  )
}
