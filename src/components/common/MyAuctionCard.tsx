import React from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi'
import placeholderImage from '../../assets/images/placeholder.jpg'
import { deleteAuction } from '../../services/auctionService'

dayjs.extend(relativeTime)

interface MyAuctionCardProps {
  id: number
  title: string
  price: number
  image?: string | null
  endDate: string
  onEdit?: () => void
}

const MyAuctionCard: React.FC<MyAuctionCardProps> = ({
  id,
  title,
  price,
  image,
  endDate,
  onEdit,
}) => {
  const navigate = useNavigate()
  const imageUrl = image ? `${api.defaults.baseURL}${image}` : placeholderImage
  const isDone = dayjs().isAfter(dayjs(endDate))
  const timeLeft = dayjs().to(dayjs(endDate))

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await deleteAuction(id)
      window.location.reload()
    } catch (err) {
      console.error('Failed to delete auction:', err)
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEdit) onEdit()
  }

  const handleCardClick = () => {
    navigate(`/auctions/${id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="rounded-2xl bg-white shadow-sm border border-gray-100 p-3 w-full hover:shadow-md flex flex-col justify-between cursor-pointer transition-shadow"
    >
      {/* Top row */}
      <div className="flex justify-between items-center mb-2">
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${isDone ? 'bg-black text-white' : 'bg-[#F9FF90] text-black'}`}>
          {isDone ? 'Done' : 'In progress'}
        </span>
        {!isDone && (
          <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-gray-800">
            {timeLeft}
            <FiClock size={10} className="text-gray-500" />
          </span>
        )}
      </div>

      {/* Title & price */}
      <h3 className="text-sm font-light mb-1 line-clamp-1">{title}</h3>
      <p className="text-base font-medium mb-2">{price} €</p>

      {/* Image */}
      <div className="rounded-xl overflow-hidden bg-gray-100 w-full aspect-[4/3] mb-2">
        <img
          src={imageUrl}
          alt={title}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.onerror = null
            target.src = placeholderImage
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Buttons */}
      {!isDone && (
        <div className="flex items-center">
          <button
            onClick={handleDelete}
            className="min-w-[48px] h-[44px] rounded-xl border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <FiTrash2 size={16} />
          </button>
          <button
            onClick={handleEdit}
            className="flex-1 ml-2 h-[44px] flex items-center justify-center gap-2 text-sm bg-black text-white px-4 rounded-xl hover:opacity-90 cursor-pointer"
          >
            <FiEdit2 size={16} /> Edit
          </button>
        </div>
      )}
    </div>
  )
}

export default MyAuctionCard
