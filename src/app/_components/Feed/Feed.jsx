import React, { useEffect } from 'react'

const Feed = () => {
  const [feedData, setFeedData] = React.useState([])
  const loadFeedData = () => {
    //Get feed data from DB
    //Feed data will likely be an array of objects
    //objects would be the most recent posts to the database
  }
  return (
    <div>
      <h1>Feed Page</h1>
      {/* TODO: Implement Feed/feedData */}
    </div>
  )
}

export default Feed
