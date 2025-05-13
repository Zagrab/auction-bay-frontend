import React from 'react'
import { api } from '../../services/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi'
import placeholderImage from '../../assets/images/placeholder.jpg'

dayjs.extend(relativeTime)

interface MyAuctionCardProps {
  title: string
  price: number
  image?: string | null
  endDate: string
}

const MyAuctionCard: React.FC<MyAuctionCardProps> = ({
  title,
  price,
  image,
  endDate,
}) => {
  const imageUrl = image ? `${api.defaults.baseURL}${image}` : placeholderImage
  const isDone = dayjs().isAfter(dayjs(endDate))
  const timeLeft = dayjs().to(dayjs(endDate))

  return (
    <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-3 w-full h-full flex flex-col justify-between transition-transform hover:scale-[1.015] hover:shadow-md">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
            isDone ? 'bg-black text-white' : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {isDone ? 'Done' : 'In progress'}
        </span>
        {!isDone && (
          <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-gray-800">
            {timeLeft}
            <FiClock size={10} className="text-gray-500" />
          </span>
        )}
      </div>

      {/* Title & Price */}
      <h3 className="text-sm font-light mb-1 line-clamp-1">{title}</h3>
      <p className="text-base font-medium mb-2">{price} €</p>

      {/* Image */}
      <div className="rounded-xl overflow-hidden bg-gray-100 w-full aspect-[4/3] mb-3">
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
        <div className="flex justify-between mt-auto">
          <button className="flex items-center gap-1 text-sm bg-black text-white px-4 py-1.5 rounded-full hover:opacity-90">
            <FiEdit2 size={14} /> Edit
          </button>
          <button className="flex items-center justify-center bg-purple-100 text-purple-600 w-8 h-8 rounded-full hover:opacity-90">
            <FiTrash2 size={14} />
          </button>
        </div>
      )}
    </div>
  )
}

export default MyAuctionCard
