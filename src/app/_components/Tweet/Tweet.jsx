/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import { FaComments, FaPaw, FaTrash } from 'react-icons/fa'
import { useGlobalStore } from '../../_util/store'
import { IconButton, PrimaryButton } from '../Buttons/Buttons'
import ProfilePicture from '../ProfileAssets/ProfilePicture'
const Tweet = ({
  id,
  text,
  likes,
  comments,
  pfp,
  petName,
  petUsername,
  petType,
  liked,
  commentsArray,
  handleLike,
  handleComment,
  handleDeleteComment,
  handleDeletePost,
}) => {
  const [showComments, setShowComments] = React.useState(false)
  const [commentText, setCommentText] = React.useState('')
  const profile = useGlobalStore(state => state.profile_full.profile)
  return (
    <div className='shadow-2xl rounded-lg p-5 bg-[#ffd3a7] flex items-start flex-col w-full lg:w-[450px]'>
      <div className='flex gap-5 items-start'>
        <ProfilePicture size={50} id={petUsername} />
        <div className='flex flex-col'>
          <div className='flex gap-3 items-center'>
            <div className='flex flex-col items-start'>
              <div className='flex gap-2 flex-wrap'>
                <p className='text-black font-bold'>{petName}</p>
                <p className='text-neutral-500'>@{petUsername}</p>
                <p className='text-neutral-400'>({petType})</p>
              </div>
              <p className='text-black'>{text}</p>
            </div>
          </div>
          <div className='flex gap-5 '>
            <div className='flex gap-1 items-center'>
              <div onClick={() => setShowComments(!showComments)}>
                <IconButton icon={<FaComments />} />
              </div>
              <p className='text-black'>{commentsArray !== null ? commentsArray.length : 0}</p>
            </div>
            <div className='flex gap-1 items-center'>
              <div onClick={() => handleLike(id)}>
                <IconButton icon={<FaPaw color={liked ? '#ff4f4f' : '#fff'} />} />
              </div>
              <p className='text-black'>{likes}</p>
            </div>
          </div>
        </div>
        {petUsername === profile.username && (
          <div className='ml-auto' onClick={() => handleDeletePost(id)}>
            <IconButton icon={<FaTrash />} />
          </div>
        )}
      </div>
      {showComments && (
        <form
          className='flex gap-2 mt-3 w-full'
          onSubmit={e => {
            handleComment(e, id, commentText)
            setCommentText('')
          }}
        >
          <input
            type='text'
            placeholder='Post your comment'
            className='rounded-lg  flex-1 pl-2'
            onChange={e => setCommentText(e.target.value)}
            value={commentText}
          />
          <PrimaryButton text={'Comment'} />
        </form>
      )}
      {showComments &&
        commentsArray !== null &&
        commentsArray.length > 0 &&
        commentsArray.map((comment, index) => (
          <div className='flex gap-3 mt-5 items-start w-full' key={index}>
            <ProfilePicture size={35} id={comment.pets_username} />
            <div className='flex flex-col items-start'>
              <div className='flex gap-2 flex-wrap '>
                <p className='text-black font-bold text-sm mt-0'>{comment.pet_info.petName}</p>
                <p className='text-neutral-500 text-sm mt-0'>@{comment.pets_username}</p>
                <p className='text-neutral-400 text-sm mt-0'>({comment.pet_info.petType})</p>
              </div>
              <p className='text-black text-sm'>{comment.comment_text}</p>
            </div>
            {comment.pets_username === profile.username && (
              <div className='ml-auto' onClick={() => handleDeleteComment(comment.id)}>
                <IconButton icon={<FaTrash />} />
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default Tweet
