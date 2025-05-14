import React, { useState, useEffect } from 'react'
import { createAuction, updateAuction } from '../services/auctionService'

interface AuctionFormData {
  id?: number
  title?: string
  description?: string
  startingPrice?: number
  endDate?: string
  image?: string | null
}

interface AddAuctionModalProps {
  onClose: () => void
  onSuccess?: () => void
  mode?: 'add' | 'edit'
  initialData?: AuctionFormData
}

const AddAuctionModal: React.FC<AddAuctionModalProps> = ({
  onClose,
  onSuccess,
  mode = 'add',
  initialData = {}
}) => {
  const [title, setTitle] = useState(initialData.title || '')
  const [description, setDescription] = useState(initialData.description || '')
  const [startingPrice, setStartingPrice] = useState<number | ''>(initialData.startingPrice ?? '')
  const [endDate, setEndDate] = useState(initialData.endDate?.split('T')[0] || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (initialData.image) {
      setImagePreview(`${import.meta.env.VITE_API_BASE_URL}${initialData.image}`)
    }
  }, [initialData.image])

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
    formData.append('endDate', new Date(endDate).toISOString())
    if (mode === 'add') {
      formData.append('startingPrice', startingPrice.toString())
    }
    if (imageFile) {
      formData.append('image', imageFile)
    } else if (initialData.image) {
      formData.append('image', initialData.image)
    }

    try {
      if (mode === 'edit' && initialData.id !== undefined) {
        await updateAuction(initialData.id, formData)
      } else {
        await createAuction(formData)
      }
      if (onSuccess) onSuccess()
      onClose()
    } catch (err) {
      console.error('Failed to submit auction:', err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-lg relative z-50">
        <h2 className="text-lg font-bold mb-4">
          {mode === 'edit' ? 'Edit auction' : 'Add auction'}
        </h2>

        <div
          className="mb-4 rounded-xl h-36 flex items-center justify-center bg-gray-50 bg-cover bg-center"
          style={{
            backgroundImage: imagePreview ? `url(${imagePreview})` : undefined,
          }}
        >
          <label className="cursor-pointer px-4 py-2 border rounded bg-white bg-opacity-70 hover:bg-opacity-90 transition">
            {imagePreview ? 'Change image' : 'Add image'}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Title */}
        <label className="text-sm font-medium block mb-1">Title</label>
        <input
          type="text"
          placeholder="Write item name here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-4 py-2 mb-4"
        />

        {/* Description */}
        <label className="text-sm font-medium block mb-1">Description</label>
        <textarea
          placeholder="Write description here…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-4 py-2 mb-4"
        />

        <div className={`flex gap-3 mb-4 ${mode === 'edit' ? 'w-full' : ''}`}>
          {/* Starting Price */}
          {mode === 'add' && (
            <div className="w-1/2">
              <label className="text-sm font-medium block mb-1">Starting price</label>
              <input
                type="number"
                placeholder="Price"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.valueAsNumber || '')}
                className="w-full border rounded px-4 py-2"
              />
            </div>
          )}

          {/* End Date */}
          <div className={`${mode === 'edit' ? 'w-full' : 'w-1/2'}`}>
            <label className="text-sm font-medium block mb-1">End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-100 px-4 py-2 rounded-full text-black cursor-pointer hover:opacity-90 transition"
          >
            {mode === 'edit' ? 'Discard changes' : 'Cancel'}
          </button>
          <button
            onClick={handleSubmit}
            className={`${mode === 'edit' ? 'bg-black text-white' : 'bg-yellow-300 text-black'} px-4 py-2 rounded-full cursor-pointer hover:opacity-90 transition`}
          >
            {mode === 'edit' ? 'Edit auction' : 'Start auction'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddAuctionModal
