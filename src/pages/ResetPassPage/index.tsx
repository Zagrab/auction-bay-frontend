import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import auctionsImage from '../../assets/images/auctions4.svg'
import { Button } from '../../components/common/Button'
import { resetPassword } from '../../services/authService'

const ResetPassPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await resetPassword({ token, newPassword, confirmPassword })
      setSuccess(true)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center">
        <img src={auctionsImage} alt="Auctions" className="max-w-full h-auto" />
      </div>

      <div className="w-1/4 min-h-screen bg-white rounded-3xl m-3 pt-16 px-8 pb-8 flex flex-col">
        <div className="w-16 h-16 bg-[#F4FF47] rounded-full flex items-center justify-center mb-6 mx-auto">
          <img src={logo} alt="Logo" />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-inter font-bold text-[32px] leading-[120%] text-gray-900 text-center mb-2">
            Reset password
          </h1>

          <p className="font-inter font-light text-[16px] leading-[24px] text-gray-600 text-center mb-6">
            Enter your new password below
          </p>

          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block font-inter font-light text-[16px] leading-[24px] text-gray-700 mb-1">
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4FF47]"
                required
              />
            </div>
            <div>
              <label className="block font-inter font-light text-[16px] leading-[24px] text-gray-700 mb-1">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F4FF47]"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            {success && <p className="text-sm text-green-600 text-center">Password reset successfully</p>}

            <Button
              type="submit"
              variant="highlight"
              className="w-full h-[40px] rounded-full font-inter font-medium text-[16px] leading-[24px] mt-2 cursor-pointer"
            >
              Reset password
            </Button>
          </form>

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

export default ResetPassPage