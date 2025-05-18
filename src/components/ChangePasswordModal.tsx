import React, { useState } from 'react'
import { updatePassword } from '../services/authService'

interface ChangePasswordModalProps {
  onClose: () => void
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    try {
      setLoading(true)
      await updatePassword({ oldPassword, newPassword, confirmPassword })
      onClose()
    } catch (error) {
      console.error('Password update failed:', error)
      alert('Failed to update password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[533px] h-[414px] p-6 shadow-lg relative z-50 overflow-hidden">
        <h2 className="text-2xl font-bold mb-6">Change password</h2>

        <div className="mb-4">
          <label className="text-sm block mb-1">Current password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border border-[#DDE9E6] rounded-xl px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm block mb-1">New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-[#DDE9E6] rounded-xl px-4 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm block mb-1">Repeat new password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-[#DDE9E6] rounded-xl px-4 py-2"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-100 px-4 py-2 rounded-full text-black hover:opacity-90 transition cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-yellow-300 px-4 py-2 rounded-full text-black hover:opacity-90 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordModal