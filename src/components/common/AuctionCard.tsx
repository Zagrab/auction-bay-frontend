import React from 'react'
import { api } from '../../services/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FiClock } from 'react-icons/fi'
import placeholderImage from '../../assets/images/placeholder.jpg'

dayjs.extend(relativeTime)

interface AuctionCardProps {
  title: string
  price: number
  image?: string | null
  status?: 'in_progress' | 'winning' | 'done'
  endDate: string
}

const AuctionCard: React.FC<AuctionCardProps> = ({
  title,
  price,
  image,
  status = 'in_progress',
  endDate,
}) => {
  const imageUrl = image ? `${api.defaults.baseURL}${image}` : placeholderImage

  const statusLabel =
    status === 'winning' ? 'Winning' :
    status === 'done' ? 'Done' :
    'In progress'

  const statusColor =
    status === 'winning'
      ? 'bg-green-100 text-green-700'
      : status === 'done'
      ? 'bg-black text-white'
      : 'bg-yellow-100 text-yellow-800'

  const timeLeft = dayjs().to(dayjs(endDate))

  return (
    <div
      className="rounded-2xl bg-white shadow-sm border border-gray-100 p-3 w-full transition-transform hover:scale-[1.015] hover:shadow-md cursor-pointer"
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor}`}
        >
          {statusLabel}
        </span>

        {status !== 'done' && (
          <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full text-gray-800">
            {timeLeft}
            <FiClock size={10} className="text-gray-500" />
          </span>
        )}
      </div>

      <h3 className="text-sm font-light mb-1 line-clamp-1">{title}</h3>
      <p className="text-base font-medium mb-2">{price} €</p>

      <div className="rounded-xl overflow-hidden bg-gray-100 w-full aspect-[4/3]">
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
    </div>
  )
}

export default AuctionCard
