import Link from 'next/link'
import React from 'react'

export const PrimaryButton = ({ type, text, to = '' }) => {
  return (
    <div className='text-center cursor-pointer '>
      <p>{text}</p>
    </div>
  )
}
