import React, { useState } from 'react'
import { PrimaryButton } from '../Buttons/Buttons'
const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    console.log('Submitted:', { username, email, firstName, lastName, password })
    //TODO: Send data to DB
  }

  return (
    <div>
      <h1 className='text-orange-600'>Looks like you don&apos;t have an account</h1>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input className='border-2 border-neutral-500' type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input className='border-2 border-neutral-500' type='email' value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          First Name:
          <input className='border-2 border-neutral-500' type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input className='border-2 border-neutral-500' type='text' value={lastName} onChange={e => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input className='border-2 border-neutral-500' type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <button type='submit'>
          <PrimaryButton text={'Create Account'}></PrimaryButton>
        </button>
      </form>
    </div>
  )
}

export default Login
