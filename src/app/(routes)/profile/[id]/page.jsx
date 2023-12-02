'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { PrimaryButton } from '../../../_components/Buttons/Buttons'
import ProfilePicture from '../../../_components/ProfileAssets/ProfilePicture'
import SearchPet from '../../../_components/SearchPet/SearchPet'
import { useGlobalStore } from '../../../_util/store'
const Page = ({ params }) => {
  const router = useRouter()
  const profile = useGlobalStore(state => state.profile_full.profile)
  const removeProfile = useGlobalStore(state => state.profileRemove)
  const [pendingFriend, setPendingFriend] = useState(null)
  const [friends, setFriends] = useState(null)
  const [visitedProfile, setVisitedProfile] = useState(null)
  const [isSearchPending, setIsSearchPending] = useState(false)
  const [isSearchFriend, setIsSearchFriend] = useState(false)
  const [isAddingPost, setIsAddingPost] = useState(false)
  const [postText, setPostText] = useState('')
  const idUrl = params.id
  useEffect(() => {
    if (!profile) {
      router.push('/')
    }
    loadData()
  }, [])
  const loadData = async () => {
    const username = await loadVisitedProfile()
    loadFriends(username)
  }
  const loadProfileData = () => {
    console.log(idUrl, profile.id)
  }
  const loadVisitedProfile = async () => {
    try {
      const response = await fetch(`/api/get-profile?id=${idUrl}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setVisitedProfile(data.petData[0])
        return data.petData[0].username
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  const loadFriends = async username => {
    console.log('loadFriends triggered')
    if (username === undefined) username = visitedProfile.username
    try {
      const response = await fetch(`/api/get-friends?pets_username_1=${username}&status=pending`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setPendingFriend(data.friendData)
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
    try {
      const response = await fetch(`/api/get-friends?pets_username_1=${username}&status=accepted`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setFriends(data.friendData)
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  const handleClosePopup = () => {
    setIsSearchFriend(false)
    setIsSearchPending(false)
  }
  const handleAddFriend = async (pets_username_1, pets_username_2, status) => {
    try {
      const response = await fetch(`/api/add-friend?pets_username_1=${pets_username_1}&pets_username_2=${pets_username_2}&status=${status}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        loadFriends()
        handleClosePopup()
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  const handleAddPost = async (e, text) => {
    e.preventDefault()
    toast.info('Loading...', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
    try {
      const response = await fetch(`/api/add-post?username=${profile.username}&text=${text}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        toast.success('Successfully Barked a Post!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  return (
    <>
      {visitedProfile !== null && profile !== null && (
        <div className='flex flex-col items-center gap-5'>
          <ProfilePicture id={profile.username} size={125} />
          <h1 className='text-2xl text-black font-bold'>{visitedProfile.petname}</h1>
          <p className='text-neutral-500'>@{visitedProfile.username}</p>
          {pendingFriend != null && friends !== null && (
            <div className='flex gap-5'>
              <div
                className='rounded-lg bg-orange-300 p-2 flex flex-col gap-2 items-center w-[125px] cursor-pointer'
                onClick={() => setIsSearchFriend(true)}
              >
                <p className='text-xl'>{friends.length}</p>
                <p className='text-neutral-600 text-center text-sm'>Friends</p>
              </div>
              <div
                className='rounded-lg bg-orange-300 p-2 flex flex-col gap-2 items-center w-[125px] cursor-pointer'
                onClick={() => setIsSearchPending(true)}
              >
                <p className='text-xl'>{pendingFriend.length}</p>
                <p className='text-neutral-600 text-center text-sm'>Pending Friends</p>
              </div>
              {isSearchPending && (
                <SearchPet
                  handleClosePopup={handleClosePopup}
                  searchTerm={'Pending Friends'}
                  searchPets={pendingFriend}
                  isFriend
                  handleAddFriend={handleAddFriend}
                />
              )}
              {isSearchFriend && (
                <SearchPet
                  handleClosePopup={handleClosePopup}
                  searchTerm={'Friends'}
                  searchPets={friends}
                  isFriend
                  handleAddFriend={handleAddFriend}
                />
              )}
            </div>
          )}
          {visitedProfile.id !== parseInt(idUrl) ? (
            <div className='flex gap-5'>
              <div onClick={loadProfileData}>
                <PrimaryButton text={'Follow'} />
              </div>
              <PrimaryButton text={'Message'} />
            </div>
          ) : (
            <div className='flex flex-col gap-5 items-center'>
              <div className='flex gap-5'>
                <PrimaryButton text={'Edit Profile'} />
                <div onClick={() => setIsAddingPost(!isAddingPost)}>
                  <PrimaryButton text={'Add a Post'} />
                </div>
                <div
                  onClick={() => {
                    removeProfile()
                    router.push('/')
                  }}
                >
                  <PrimaryButton text={'Sign Out'} />
                </div>
              </div>
              {isAddingPost && (
                <form
                  className='flex gap-2 mt-3 w-full'
                  onSubmit={e => {
                    handleAddPost(e, postText)
                    setIsAddingPost(false)
                    setPostText('')
                  }}
                >
                  <input
                    type='text'
                    placeholder='Post something...'
                    className='rounded-lg flex-1 pl-2'
                    onChange={e => setPostText(e.target.value)}
                    value={postText}
                  />
                  <PrimaryButton text={'Post!'} />
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Page
