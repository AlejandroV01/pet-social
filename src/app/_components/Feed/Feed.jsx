import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useGlobalStore } from '../../_util/store'
import { IconButton } from '../Buttons/Buttons'
import SearchPet from '../SearchPet/SearchPet'
import Tweet from '../Tweet/Tweet'
const Feed = () => {
  const profile = useGlobalStore(state => state.profile_full.profile)
  const posts = useGlobalStore(state => state.profile_full.posts)
  const [feedData, setFeedData] = React.useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchPets, setSearchPets] = useState([])
  const [isSearchVisible, setSearchVisible] = useState(false)
  useEffect(() => {
    if (feedData.length !== 0) return
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
      const response = await fetch(`/api/add-like?postId=${id}&username=${profile.username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        toast.success('Post Liked!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        loadFeedData()
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  const handleSearch = async e => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/search-pet?search=${searchTerm}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        toast.success('Loaded all Results', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        setSearchPets(data.pets)
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
    setSearchVisible(true)
  }
  const handleComment = async (e, id, commentText) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/add-comment?postId=${id}&username=${profile.username}&comment=${commentText}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentText }),
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        toast.success('Nice Comment!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        loadFeedData()
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  const handleClosePopup = () => {
    setSearchVisible(false)
  }
  const handleDeleteComment = async commentId => {
    try {
      const response = await fetch(`/api/delete-comment?commentId=${commentId}&username=${profile.username}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        toast.success('Comment Deleted', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        loadFeedData()
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  const handleEditComment = async (e, commentId, comment) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/edit-comment?commentId=${commentId}&username=${profile.username}&comment=${comment}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        toast.success('Comment Edited', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        loadFeedData()
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  const handleDeletePost = async postId => {
    try {
      const response = await fetch(`/api/delete-post?username=${profile.username}&postId=${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const data = await response.json()
        toast.success('Post Deleted', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        loadFeedData()
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }
  console.log(profile)
  return (
    <div className='ml-auto mr-auto max-w-[1170px] w-full px-6'>
      <h1 className='font-bold text-lg text-left'>Hello, {profile.petname}</h1>
      <div className='flex flex-col items-center gap-5 mt-5'>
        <form className='flex gap-2 items-center' onSubmit={e => handleSearch(e)}>
          <input
            type='text'
            placeholder='Search for pets...'
            className='p-2 rounded-lg'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div onClick={handleSearch}>
            <IconButton icon={<FaSearch size={18} />} />
          </div>
          {isSearchVisible && <SearchPet searchTerm={searchTerm} searchPets={searchPets} handleClosePopup={handleClosePopup} />}
        </form>
        {feedData !== null &&
          feedData.length > 0 &&
          feedData.map(post => {
            return (
              <Tweet
                key={post.id}
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
                handleDeleteComment={handleDeleteComment}
                handleDeletePost={handleDeletePost}
                handleEditComment={handleEditComment}
              />
            )
          })}
      </div>
    </div>
  )
}

export default Feed
