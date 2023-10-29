import Link from 'next/link'
import React from 'react'
const Navbar = () => {
  return (
    <div>
      <div>
        <Link href={'/'}>Home</Link>
        <Link href={'/profile'}>Profile</Link>
      </div>
    </div>
  )
}

export default Navbar
