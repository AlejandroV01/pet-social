'use client'
import Link from 'next/link'
import React from 'react'
import { useGlobalStore } from '../../_util/store'
const Navbar = () => {
  const profile = useGlobalStore(state => state.profile_full.profile)
  return (
    <div className='bg-mainGreen px-6 w-full mb-4'>
      <div className=' w-full flex justify-between py-2 ml-auto mr-auto max-w-[1170px]'>
        <Link href={'/'}>
          <h1 className='text-white font-bold text-2xl'>BarkTweet</h1>
        </Link>
        <div className='flex gap-4'>
          <Link href={'/'} className='text-white text-lg'>
            Home
          </Link>
          <Link href={`/profile/${profile.id}`} className='text-white text-lg'>
            Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
