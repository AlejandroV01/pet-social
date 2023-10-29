'use client'
import React, { useEffect } from 'react'
const Page = ({ params }) => {
  const loadUserData = () => {
    //TODO: Read DB and write user data into state
  }
  useEffect(() => {
    loadUserData(params.id)
  }, [])
  return (
    <div>
      <h1>Profile</h1>
      <p>Current profile id: {params.id}</p>
    </div>
  )
}

export default Page
