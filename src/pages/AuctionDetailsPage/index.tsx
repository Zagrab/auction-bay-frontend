import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAuctionById } from '../../services/auctionService'
import { fetchCurrentUser, type User } from '../../services/userService'
import { api } from '../../services/api'
import placeholder from '../../assets/images/placeholder.jpg'
import { FiClock } from 'react-icons/fi'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const AuctionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [auction, setAuction] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [bidAmount, setBidAmount] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [auctionData, userData] = await Promise.all([
          fetchAuctionById(Number(id)),
          fetchCurrentUser()
        ])
        setAuction(auctionData)
        setCurrentUser(userData)
      } catch (err) {
        console.error('Failed to load auction or user:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) loadData()
  }, [id])

  if (loading) return <div className="p-6">Loading...</div>
  if (!auction) return <div className="p-6 text-red-600">Auction not found.</div>

  const imageUrl = auction.image ? `${api.defaults.baseURL}${auction.image}` : placeholder

  const isDone = dayjs().isAfter(dayjs(auction.endDate))
  const highestBid = Math.max(...(auction.bids?.map((b: any) => b.amount) || [0]))
  const myBid = auction.bids?.find((b: any) => b.userId === currentUser?.id)
  const isWinning = myBid?.amount === highestBid

  let statusLabel = 'In progress'
  let statusColor = 'bg-yellow-100 text-yellow-800'

  if (isDone) {
    statusLabel = 'Done'
    statusColor = 'bg-black text-white'
  } else if (myBid) {
    if (isWinning) {
      statusLabel = 'Winning'
      statusColor = 'bg-green-100 text-green-700'
    } else {
      statusLabel = 'Outbid'
      statusColor = 'bg-red-100 text-red-700'
    }
  }

  const timeLeft = dayjs().to(dayjs(auction.endDate))

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6">
      {/* Left - Image */}
      <div className="flex-1 rounded-2xl overflow-hidden">
        <img
          src={imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.onerror = null
            target.src = placeholder
          }}
        />
      </div>

      {/* Right - Info */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Auction Info */}
        <div className="bg-gray-50 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor}`}>
              {statusLabel}
            </span>
            {!isDone && (
              <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                {timeLeft} <FiClock size={12} />
              </span>
            )}
          </div>

          <h1 className="mb-2 font-inter font-bold text-[32px] leading-[120%]">{auction.title}</h1>

          <p className="mb-6 font-inter font-light text-[16px] leading-6">{auction.description}</p>

          <div className="flex justify-end items-center gap-2">
            <label
              htmlFor="bid"
              className="font-inter font-light text-[16px] leading-6"
            >
              Bid:
            </label>
            <input
              id="bid"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-[80px] border border-[#DDE9E6] rounded-full px-3 py-1 text-sm"
              placeholder="€"
            />
            <button
              className="px-4 py-2 rounded-full text-sm font-medium hover:opacity-90"
              style={{ backgroundColor: '#F4FF47' }}
            >
              Place bid
            </button>
          </div>
        </div>

        {/* Bidding History */}
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h2 className="mb-4 font-inter font-bold text-[23px] leading-[120%]">
            Bidding history ({auction.bids?.length || 0})
          </h2>

          {auction.bids && auction.bids.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {auction.bids.map((bid: any) => (
                <li
                  key={bid.id}
                  className="flex justify-between items-center text-sm bg-white p-3 rounded-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full" />
                    <span>User {bid.userId}</span>
                  </div>

                  <div className="flex items-center gap-8 ml-auto">
                    <span className="font-inter font-light text-[16px] leading-6">
                      {dayjs(bid.createdAt).format('HH:mm D.M.YYYY')}
                    </span>

                    <span className="text-black font-medium bg-[#F4FF47] rounded-full px-4 py-[6px] h-[32px] flex items-center justify-center">
                      {bid.amount} €
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <p className="font-inter font-semibold text-[18px] leading-[120%]">
                No bids yet!
              </p>
              <p className="font-inter font-light text-[16px] leading-6 text-[#74817F] mt-2 max-w-xs">
                Place your bid to have a chance to get this item.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuctionDetailsPage
