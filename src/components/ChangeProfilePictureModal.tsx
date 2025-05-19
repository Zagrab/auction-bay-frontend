import React, { useState, useEffect } from 'react'
import { uploadProfilePicture } from '../services/auctionService'
import { fetchCurrentUser } from '../services/userService'
import logo from '../assets/images/logo.png'
import { api } from '../services/api'

interface ChangeProfilePictureModalProps {
  onClose: () => void
  onSuccess?: () => void
}

const ChangeProfilePictureModal: React.FC<ChangeProfilePictureModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadPicture = async () => {
      try {
        const user = await fetchCurrentUser()
        const image = user.picture
          ? `${api.defaults.baseURL}${user.picture}`
          : logo
        setPreview(image)
      } catch (err) {
        console.error('Failed to fetch user picture', err)
        setPreview(logo)
      }
    }

    loadPicture()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
    if (selected) {
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(selected)
    }
  }

  const handleSubmit = async () => {
    if (!file) return
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('picture', file)
      await uploadProfilePicture(formData)
      if (onSuccess) onSuccess()
      window.location.reload()
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to update profile picture.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[533px] h-[276px] p-6 shadow-lg relative z-50 overflow-hidden text-center">
        <h2 className="text-2xl font-bold mb-6 text-left">Change profile picture</h2>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
          />
        )}

        <label className="inline-block border border-black rounded-full px-6 py-2 cursor-pointer hover:bg-gray-100 transition mb-6">
          Upload new picture
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-100 px-4 py-2 rounded-full text-black hover:opacity-90 transition cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#F4FF47] px-4 py-2 rounded-full text-black hover:opacity-90 transition cursor-pointer"
            disabled={loading || !file}
          >
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangeProfilePictureModal
