import React from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FiClock } from 'react-icons/fi'
import placeholderImage from '../../assets/images/placeholder.jpg'

dayjs.extend(relativeTime)

interface AuctionCardProps {
  id: number
  title: string
  price: number
  image?: string | null
  status?: 'in_progress' | 'winning' | 'done' | 'outbid'
  endDate: string
}

const AuctionCard: React.FC<AuctionCardProps> = ({
  id,
  title,
  price,
  image,
  status = 'in_progress',
  endDate,
}) => {
  const navigate = useNavigate()
  const imageUrl = image ? `${api.defaults.baseURL}${image}` : placeholderImage
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

  let statusLabel = 'In progress'
  let statusColor = 'bg-[#F9FF90] text-black'

  if (status === 'done') {
    statusLabel = 'Done'
    statusColor = 'bg-black text-white'
  } else if (status === 'winning') {
    statusLabel = 'Winning'
    statusColor = 'bg-[#ADFF90] text-black'
  } else if (status === 'outbid') {
    statusLabel = 'Outbid'
    statusColor = 'bg-[#FFAA98] text-black'
  }

  return (
    <div
      onClick={() => navigate(`/auctions/${id}`)}
      className="rounded-2xl bg-white shadow-sm border border-gray-100 p-3 w-full hover:shadow-md cursor-pointer transition-shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`font-inter font-light text-[12px] leading-[24px] px-2 rounded-full ${statusColor}`}>
          {statusLabel}
        </span>
        {status !== 'done' && (
          <span className={`flex items-center gap-1 font-inter font-light text-[12px] leading-[24px] px-2 rounded-full ${isLessThan24h ? 'bg-[#FFAA98] text-black' : 'text-gray-800'}`}>
            {timeLeft}
            <FiClock size={12} className={isLessThan24h ? 'text-black' : 'text-gray-500'} />
          </span>
        )}
      </div>

      <h3 className="text-sm font-light mb-1 font-inter line-clamp-1">{title}</h3>
      <p className="text-base font-medium mb-2 font-inter">{price} €</p>

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
