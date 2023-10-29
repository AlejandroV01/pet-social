import Link from 'next/link'
import React from 'react'
const ErrorProfile = () => {
  return (
    <div>
      <h1>ERROR, NOT A PROFILE</h1>
      <Link href={'/'} className='underline text-blue-300'>
        Go back to home
      </Link>
    </div>
  )
}

export default ErrorProfile
