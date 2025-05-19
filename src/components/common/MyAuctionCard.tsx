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
  const diff = dayjs(endDate).diff(dayjs(), 'second')
  const isLessThan24h = diff < 60 * 60 * 24

  let timeLeft = ''
  if (diff < 60 * 60) {
    const minutes = Math.ceil(diff / 60)
    timeLeft = `${minutes}m`
  } else if (diff < 60 * 60 * 24) {
    const hours = Math.ceil(diff / (60 * 60))
    timeLeft = `${hours}h`
  } else if (diff < 60 * 60 * 24 * 30) {
    const days = Math.ceil(diff / (60 * 60 * 24))
    timeLeft = `${days}d`
  } else if (diff < 60 * 60 * 24 * 365) {
    const months = Math.ceil(diff / (60 * 60 * 24 * 30))
    timeLeft = `${months}mo`
  } else {
    const years = Math.ceil(diff / (60 * 60 * 24 * 365))
    timeLeft = `${years}y`
  }

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
        <span
          className={`font-inter font-light text-[12px] leading-[24px] px-2 rounded-full ${
            isDone ? 'bg-black text-white' : 'bg-[#F9FF90] text-black'
          }`}
        >
          {isDone ? 'Done' : 'In progress'}
        </span>
        {!isDone && (
          <span
            className={`flex items-center gap-1 font-inter font-light text-[12px] leading-[24px] px-2 rounded-full ${
              isLessThan24h ? 'bg-[#FFAA98] text-black' : 'text-gray-800'
            }`}
          >
            {timeLeft}
            <FiClock
              size={12}
              className={isLessThan24h ? 'text-black' : 'text-gray-500'}
            />
          </span>
        )}
      </div>

      {/* Title & price */}
      <h3 className="text-sm font-light mb-1 font-inter line-clamp-1">{title}</h3>
      <p className="text-base font-medium mb-2 font-inter">{price} €</p>

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
