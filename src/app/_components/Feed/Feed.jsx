import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useGlobalStore } from '../../_util/store'
import { IconButton } from '../Buttons/Buttons'
import Tweet from '../Tweet/Tweet'
const Feed = () => {
  const [feedData, setFeedData] = React.useState([])
  const loadFeedData = () => {
    //Get feed data from DB
    //Feed data will likely be an array of objects
    //objects would be the most recent posts to the database
  }
  const profile = useGlobalStore(state => state.profile_full.profile)
  const posts = useGlobalStore(state => state.profile_full.posts)
  return (
    <div className='ml-auto mr-auto max-w-[1170px] w-full px-6'>
      <h1 className='font-bold text-lg text-left'>Hello, {profile.petName}</h1>
      <div className='flex flex-col items-center gap-5 mt-5'>
        <div className='flex gap-2'>
          <input type='text' placeholder='Search for pets...' className='p-2 rounded-lg' />
          <IconButton icon={<FaSearch size={18} />} />
        </div>
        {posts.map((post, index) => {
          console.log(post)
          return (
            <Tweet
              key={index}
              id={post.id}
              likes={post.likes}
              petName={post.petName}
              petUsername={post.username}
              petType={post.petType}
              text={post.text}
              liked={false}
              commentsArray={post.comments}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Feed
