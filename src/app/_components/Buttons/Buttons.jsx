import Link from 'next/link'
import React from 'react'

export const PrimaryButton = ({ type, text, to = '' }) => {
  return (
    <button className='text-center cursor-pointer bg-mainGreen text-white rounded-lg p-2 hover:bg-[#a5d671]' type={type}>
      <p>{text}</p>
    </button>
  )
}

export const IconButton = ({ type, icon, to = '' }) => {
  return (
    <div className='text-center cursor-pointer bg-mainGreen text-white rounded-lg p-2 hover:bg-[#a5d671] flex items-center justify-center'>
      {icon}
    </div>
  )
}
