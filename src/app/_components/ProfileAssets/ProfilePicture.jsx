/* eslint-disable @next/next/no-img-element */
import React from 'react'

const ProfilePicture = ({ size, id }) => {
  return (
    <img
      src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${id}&backgroundColor=059ff2,71cf62,d84be5,d9915b,f6d594,fcbc34,ffd5dc,ffdfbf,d1d4f9,c0aede,b6e3f4&backgroundType=solid,gradientLinear&eyes=closed,closed2,crying,cute,glasses,love,plain,shades,sleepClose,stars,wink,wink2&mouth=cute,drip,faceMask,kissHeart,lilSmile,smileLol,smileTeeth,tongueOut,wideSmile`}
      alt='profile picture'
      width={size}
      height={size}
      className='rounded-full'
    />
  )
}

export default ProfilePicture
