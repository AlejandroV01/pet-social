/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import { FaComments, FaPaw } from 'react-icons/fa'
import { IconButton } from '../Buttons/Buttons'
const Tweet = ({ id, text, likes, comments, pfp, petName, petUsername, petType, liked }) => {
  const [isLiked, setIsLiked] = React.useState(liked)
  const [likeCount, setLikeCount] = React.useState(likes)
  const handleLike = () => {
    console.log('Liked:', id, 'set to:', !isLiked)
    setIsLiked(!isLiked)
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    //TODO: Send like to DB
  }
  return (
    <div className='shadow-2xl rounded-lg p-5 bg-[#ffd3a7]'>
      <div className='flex gap-3 items-center'>
        <div className='flex flex-col items-start'>
          <div className='flex gap-2'>
            <p className='text-black font-bold'>{petName}</p>
            <p className='text-neutral-500'>@{petUsername}</p>
            <p className='text-neutral-400'>({petType})</p>
          </div>
          <p className='text-black'>{text}</p>
        </div>
      </div>
      <div className='flex gap-5'>
        <div className='flex gap-1 items-center'>
          <IconButton icon={<FaComments />} />
          <p className='text-black'>{comments}</p>
        </div>
        <div className='flex gap-1 items-center'>
          <div onClick={handleLike}>
            <IconButton icon={<FaPaw color={isLiked && '#ff4f4f'} />} />
          </div>
          <p className='text-black'>{likeCount}</p>
        </div>
      </div>
    </div>
  )
}

export default Tweet
