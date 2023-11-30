'use client'
import React, { useEffect } from 'react'
import { PrimaryButton } from '../../../_components/Buttons/Buttons'
import ProfilePicture from '../../../_components/ProfileAssets/ProfilePicture'
import { useGlobalStore } from '../../../_util/store'
const Page = ({ params }) => {
  const profile = useGlobalStore(state => state.profile_full.profile)
  const removeProfile = useGlobalStore(state => state.removeProfile)
  return (
    <div className='flex flex-col items-center gap-5'>
      <ProfilePicture id={profile.username} size={125} />
      <h1 className='text-2xl text-black font-bold'>{profile.petName}</h1>
      <p className='text-neutral-500'>@{profile.username}</p>
      <PrimaryButton text={'Edit Profile'} />
      <PrimaryButton text={'Add a Post'} />
      <div onClick={removeProfile}>
        <PrimaryButton text={'Sign Out'} />
      </div>
    </div>
  )
}

export default Page
