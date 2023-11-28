import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IconButton } from '../Buttons/Buttons'
import Tweet from '../Tweet/Tweet'
const Feed = () => {
  const [feedData, setFeedData] = React.useState([])
  const loadFeedData = () => {
    //Get feed data from DB
    //Feed data will likely be an array of objects
    //objects would be the most recent posts to the database
  }
  return (
    <div className='ml-auto mr-auto max-w-[1170px] w-full px-6'>
      <h1 className='font-bold text-lg text-left'>Hello, User1</h1>
      <div className='flex flex-col items-center gap-5 mt-5'>
        <div className='flex gap-2'>
          <input type='text' placeholder='Search for pets...' className='p-2 rounded-lg' />
          <IconButton icon={<FaSearch size={18} />} />
        </div>
        <Tweet
          id={1}
          comments={2}
          likes={12}
          petName={'Tim'}
          petUsername={'the_tim'}
          petType={'rottweiler'}
          pfp={'https://images.squarespace-cdn.com/content/v1/62730f9d8723c151520d30f5/1652365175215-F640B37XT6I7SZY30FYE/Goldendoodle+Puppy'}
          text={'Going to the dog park today at 6pm!'}
          liked={false}
        />
      </div>
    </div>
  )
}

export default Feed
