'use client'
import React, { useEffect } from 'react'
import { PrimaryButton } from '../../../_components/Buttons/Buttons'
import { useGlobalStore } from '../../../_util/store'
const Page = ({ params }) => {
  const profile = useGlobalStore(state => state.profile_full.profile)

  return (
    <div className='flex flex-col items-center gap-5'>
      <img src={`https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=${profile.id}`} alt='' className='w-[125px] h-[125px] rounded-full' />
      <h1 className='text-2xl text-black font-bold'>{profile.petName}</h1>
      <p className='text-neutral-500'>@{profile.username}</p>
      <PrimaryButton text={'Edit Profile'} />
      <PrimaryButton text={'Add a Post'} />
    </div>
  )
}

export default Page
