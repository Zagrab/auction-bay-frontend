import React, { useState } from 'react'
import { createAuction } from '../services/auctionService'

interface AddAuctionModalProps {
  onClose: () => void
  onSuccess?: () => void // to refresh auctions if needed
}

const AddAuctionModal: React.FC<AddAuctionModalProps> = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startingPrice, setStartingPrice] = useState<number | ''>('')
  const [endDate, setEndDate] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('startingPrice', startingPrice.toString())
    formData.append('endDate', new Date(endDate).toISOString())
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      await createAuction(formData)
      if (onSuccess) onSuccess()
      else window.location.reload()
      onClose()
    } catch (err) {
      console.error('Failed to add auction:', err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-lg relative z-50">
        <h2 className="text-lg font-bold mb-4">Add auction</h2>

        {/* Image upload with preview */}
        <div
          className="mb-4 rounded-xl h-36 flex items-center justify-center bg-gray-50 bg-cover bg-center"
          style={{
            backgroundImage: imagePreview ? `url(${imagePreview})` : undefined,
          }}
        >
          <label className="cursor-pointer px-4 py-2 border rounded bg-white bg-opacity-70 hover:bg-opacity-90 transition">
            Add image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Fields */}
        <input
          type="text"
          placeholder="Write item name here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-4 py-2 mb-3"
        />
        <textarea
          placeholder="Write description here…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-4 py-2 mb-3"
        />
        <div className="flex gap-3 mb-4">
          <input
            type="number"
            placeholder="Price"
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.valueAsNumber || '')}
            className="w-1/2 border rounded px-4 py-2"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-1/2 border rounded px-4 py-2"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-100 px-4 py-2 rounded-full text-black cursor-pointer hover:opacity-90 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-yellow-300 px-4 py-2 rounded-full text-black cursor-pointer hover:opacity-90 transition"
          >
            Start auction
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddAuctionModal
