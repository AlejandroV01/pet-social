import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useGlobalStore } from '../../_util/store'
import { IconButton } from '../Buttons/Buttons'
import Tweet from '../Tweet/Tweet'
const Feed = () => {
  const profile = useGlobalStore(state => state.profile_full.profile)
  const posts = useGlobalStore(state => state.profile_full.posts)
  const [feedData, setFeedData] = React.useState([])
  useEffect(() => {
    console.log('Feed.jsx: useEffect')
    loadFeedData()
  }, [])
  const loadFeedData = async () => {
    try {
      const response = await fetch(`/api/load-posts?username=${profile.username}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        const postArray = data.allPosts
        console.log(data)
        setFeedData(postArray)
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  const handleLike = async id => {
    try {
      const response = await fetch(`/api/add-like?postId=${id}&petUsername=${profile.username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        loadFeedData()
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  const handleComment = async (id, commentText) => {}

  return (
    <div className='ml-auto mr-auto max-w-[1170px] w-full px-6'>
      <h1 className='font-bold text-lg text-left'>Hello, {profile.petName}</h1>
      <div className='flex flex-col items-center gap-5 mt-5'>
        <div className='flex gap-2'>
          <input type='text' placeholder='Search for pets...' className='p-2 rounded-lg' />
          <IconButton icon={<FaSearch size={18} />} />
        </div>
        {feedData !== null &&
          feedData.length > 0 &&
          feedData.map((post, index) => {
            return (
              <Tweet
                key={index}
                id={post.id}
                likes={post.like_count}
                petName={post.petname}
                petUsername={post.pets_username}
                petType={post.pettype}
                text={post.text}
                liked={post.liked_by_user}
                commentsArray={post.comments}
                handleLike={handleLike}
                handleComment={handleComment}
              />
            )
          })}
      </div>
    </div>
  )
}

export default Feed
