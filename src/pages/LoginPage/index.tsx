// src/pages/LoginPage/index.tsx
import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Button } from '../../components/common/Button'
import { Link } from 'react-router-dom'
import { useSignIn } from '../../hooks/useSignIn'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleSignIn, loading, error } = useSignIn()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSignIn({ email, password })
  }

  return (
    <div className="min-h-screen flex bg-green-50">
      {/* Left (2/3 width) */}
      <div className="flex-1" />

      {/* Right (1/3 width) */}
      <div className="w-1/4 min-h-screen bg-white rounded-3xl m-3 pt-16 px-8 pb-8 flex flex-col">
        <div className="w-16 h-16 bg-[#F4FF47] rounded-full flex items-center justify-center mb-6 mx-auto">
          <img src={logo} alt="Logo" />
        </div>

        {/* Title & subtitle */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2 mt-36">
          Welcome back!
        </h1>
        <p className="text-base font-light text-gray-600 text-center mb-8">
          Please enter your details
        </p>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="space-y-6 flex-1 flex flex-col justify-between mt-8"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4FF47]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4FF47]"
                required
              />
              <div className="text-right mt-1">
                <Link to="/forgot" className="text-sm text-gray-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            {error && (
              <p className="text-center text-red-600 text-sm">{error}</p>
            )}
            <Button
              type="submit"
              variant="highlight"
              className="w-full h-[40px] rounded-2xl font-medium text-base leading-6 mt-4 cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Logging in…' : 'Login'}
            </Button>
          </div>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-700 mt-6 mb-8">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
