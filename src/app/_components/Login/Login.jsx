import React, { useState } from 'react'
import { toast } from 'react-toastify'
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

  const handleSubmit = async event => {
    event.preventDefault()
    if (username === '' || email === '' || password === '' || petName === '' || petType === '') return

    try {
      const response = await fetch(
        `http://localhost:3000/api/create-account?username=${username}&email=${email}&password=${password}&petName=${petName}&petType=${petType}`,
        {
          method: 'GET',
        }
      )
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error:', errorData)
        toast.error('Username or email taken, try again!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      } else {
        // Handle success if needed
        const responseData = await response.json()
        console.log('Response:', responseData)
        toast.success('Account Created! Now Sign In with the same information', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      }
    } catch (error) {
      // Handle any network or fetch-related errors
      console.error('Network or fetch error:', error)
    }
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
        <PrimaryButton text={'Create Account'} />
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
        <PrimaryButton text={'Sign In'} />
      </form>
    </div>
  )
}
