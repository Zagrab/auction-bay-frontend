import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import auctionsImage from '../../assets/images/auctions4.svg'
import { Button } from '../../components/common/Button'

const ForgotPassPage: React.FC = () => {
  const [email, setEmail] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex">
      {/* Left section */}
      <div className="flex-1 flex items-center justify-center">
        <img src={auctionsImage} alt="Auctions" className="max-w-full h-auto" />
      </div>

      {/* Right section */}
      <div className="w-1/4 min-h-screen bg-white rounded-3xl m-3 pt-16 px-8 pb-8 flex flex-col">
        {/* Logo */}
        <div className="w-16 h-16 bg-[#F4FF47] rounded-full flex items-center justify-center mb-6 mx-auto">
          <img src={logo} alt="Logo" />
        </div>

        {/* Centered Content */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Title */}
          <h1 className="font-inter font-bold text-[32px] leading-[120%] text-gray-900 text-center mb-2">
            Forgot password?
          </h1>

          {/* Subtitle */}
          <p className="font-inter font-light text-[16px] leading-[24px] text-gray-600 text-center mb-6">
            No worries, we will send you reset instructions
          </p>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block font-inter font-light text-[16px] leading-[24px] text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4FF47]"
                required
              />
            </div>

            {/* Reset Password Button */}
            <Button
              type="submit"
              variant="highlight"
              className="w-full h-[40px] rounded-full font-inter font-medium text-[16px] leading-[24px] mt-2 cursor-pointer"
            >
              Reset password
            </Button>
          </form>

          {/* Back to login link */}
          <div className="text-center mt-4 text-sm text-gray-500">
            <Link
              to="/login"
              className="font-inter font-light text-[12px] leading-[16px] hover:underline flex items-center justify-center gap-1"
            >
              <span className="text-lg">←</span> Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassPage
