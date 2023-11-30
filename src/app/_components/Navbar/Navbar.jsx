'use client'
import Link from 'next/link'
import React from 'react'
import { useGlobalStore } from '../../_util/store'
import { SecondaryButton } from '../Buttons/Buttons'
const Navbar = () => {
  const profile = useGlobalStore(state => state.profile_full.profile)
  const removeProfile = useGlobalStore(state => state.removeProfile)
  const isAuth = useGlobalStore(state => state.profile_full.profile !== null)

  return (
    <div className='bg-mainGreen px-6 w-full mb-4'>
      <div className=' w-full flex justify-between py-2 ml-auto mr-auto max-w-[1170px] items-center'>
        <Link href={'/'}>
          <h1 className='text-white font-bold text-2xl'>BarkTweet</h1>
        </Link>
        {isAuth && (
          <div className='flex gap-4 items-center'>
            <Link href={'/'} className='text-white text-lg'>
              Home
            </Link>
            <Link href={`/profile/${profile.id}`} className='text-white text-lg'>
              Profile
            </Link>
            <div onClick={removeProfile}>
              <SecondaryButton text={'Sign Out'} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
