import Link from 'next/link'
import React from 'react'

export const PrimaryButton = ({ text }) => {
  return (
    <button className='text-center cursor-pointer bg-mainGreen text-white rounded-lg p-2 hover:bg-[#a5d671]' type={'submit'}>
      <p>{text}</p>
    </button>
  )
}

export const SecondaryButton = ({ text }) => {
  return (
    <div className='text-center cursor-pointer bg-[#ffe7d0] text-black rounded-lg p-2 hover:bg-[#f1d5ba]'>
      <p>{text}</p>
    </div>
  )
}

export const IconButton = ({ type, icon, to = '' }) => {
  return (
    <div className='text-center cursor-pointer bg-mainGreen text-white rounded-lg p-2 hover:bg-[#a5d671] flex items-center justify-center'>
      {icon}
    </div>
  )
}
