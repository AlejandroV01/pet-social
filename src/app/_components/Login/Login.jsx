import React, { useState } from 'react'
import { useGlobalStore } from '../../_util/store'

import { PrimaryButton } from '../Buttons/Buttons'
const Login = () => {
  return (
    <div className='ml-auto mr-auto max-w-[1170px] w-full px-6 flex flex-col items-center gap-10'>
      <CreateAccount />
      <SignIn />
    </div>
  )
}

export default Login

const CreateAccount = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [petName, setPetName] = useState('')
  const [password, setPassword] = useState('')
  const [petType, setPetType] = useState('')
  const addProfile = useGlobalStore(state => state.profile_add_profile)
  const handleSubmit = event => {
    event.preventDefault()
    if (username === '' || email === '' || petName === '' || password === '' || petType === '') return
    console.log('Submitted:', { username, email, petName, password, petType })
    const profile = {
      username: username,
      email: email,
      petName: petName,
      password: password,
      petType: petType,
    }
    addProfile(profile)
    //TODO: Send data to DB
  }
  return (
    <div className='bg-white px-6 py-6 rounded-xl max-w-[400px] w-full'>
      <h1 className='text-orange-600 text-sm text-center'>Looks like you don&apos;t have an account</h1>
      <h1 className='text-center text-3xl mb-3 font-bold'>Create Account</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <label className='flex justify-between'>
          Username:
          <input className='border-2 border-mainGreen rounded-lg' type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label className='flex justify-between'>
          Email:
          <input className='border-2 border-mainGreen rounded-lg' type='email' value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className='flex justify-between'>
          Pet Name:
          <input className='border-2 border-mainGreen rounded-lg' type='text' value={petName} onChange={e => setPetName(e.target.value)} />
        </label>
        <label className='flex justify-between'>
          Pet Type:
          <input className='border-2 border-mainGreen rounded-lg' type='text' value={petType} onChange={e => setPetType(e.target.value)} />
        </label>
        <label className='flex justify-between'>
          Password:
          <input className='border-2 border-mainGreen rounded-lg' type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <button type='submit'>
          <PrimaryButton text={'Create Account'}></PrimaryButton>
        </button>
      </form>
    </div>
  )
}

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = event => {
    event.preventDefault()
    if (email === '' || password === '') return

    console.log('Submitted:', { email, password })

    //TODO: Check if email and password match DB
  }
  return (
    <div className='bg-white px-6 py-6 rounded-xl max-w-[400px] w-full'>
      <h1 className='text-green-600 text-sm text-center'>Already have an account?</h1>
      <h1 className='text-center text-3xl mb-3 font-bold'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <label className='flex justify-between'>
          Email:
          <input className='border-2 border-mainGreen rounded-lg' type='email' value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className='flex justify-between'>
          Password:
          <input className='border-2 border-mainGreen rounded-lg' type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type='submit'>
          <PrimaryButton text={'Sign In'}></PrimaryButton>
        </button>
      </form>
    </div>
  )
}
