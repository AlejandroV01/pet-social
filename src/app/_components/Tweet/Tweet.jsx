/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import { FaComments, FaPaw } from 'react-icons/fa'
import { useGlobalStore } from '../../_util/store'
import { IconButton, PrimaryButton } from '../Buttons/Buttons'
const Tweet = ({ id, text, likes, comments, pfp, petName, petUsername, petType, liked, commentsArray }) => {
  const [isLiked, setIsLiked] = React.useState(liked)
  const [likeCount, setLikeCount] = React.useState(likes)
  const [showComments, setShowComments] = React.useState(false)
  const [commentArray, setCommentArray] = React.useState(commentsArray)
  const [commentText, setCommentText] = React.useState('')
  const [commentCount, setCommentCount] = React.useState(commentsArray.length)
  const profile = useGlobalStore(state => state.profile_full.profile)
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
  const handleComment = event => {
    event.preventDefault()
    if (commentText === '') return
    console.log('Comment on post with id of:', id, 'total comments change to:', commentArray.length + 1, '| Comment:', commentText)
    //TODO: Send comment to DB
    setCommentArray([
      ...commentArray,
      {
        text: commentText,
        petName: profile.petName,
        petUsername: profile.username,
        petType: profile.petType,
      },
    ])
    setCommentText('')
    setCommentCount(commentArray.length + 1)
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
      <div className='flex gap-5 '>
        <div className='flex gap-1 items-center'>
          <div onClick={() => setShowComments(!showComments)}>
            <IconButton icon={<FaComments />} />
          </div>
          <p className='text-black'>{commentCount}</p>
        </div>
        <div className='flex gap-1 items-center'>
          <div onClick={handleLike}>
            <IconButton icon={<FaPaw color={isLiked ? '#ff4f4f' : '#fff'} />} />
          </div>
          <p className='text-black'>{likeCount}</p>
        </div>
      </div>
      {showComments && (
        <form className='flex gap-2 mt-3' onSubmit={handleComment}>
          <input
            type='text'
            placeholder='Post your comment'
            className='rounded-lg px-2'
            onChange={e => setCommentText(e.target.value)}
            value={commentText}
          />
          <PrimaryButton text={'Comment'} />
        </form>
      )}
      {showComments &&
        commentArray.length > 0 &&
        commentArray.map((comment, index) => (
          <div className='flex gap-3 items-center mt-5' key={index}>
            <div className='flex flex-col items-start'>
              <div className='flex gap-2'>
                <p className='text-black font-bold'>{comment.petName}</p>
                <p className='text-neutral-500'>@{comment.petUsername}</p>
                <p className='text-neutral-400'>({comment.petType})</p>
              </div>
              <p className='text-black'>{comment.text}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Tweet
