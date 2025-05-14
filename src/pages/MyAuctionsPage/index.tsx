// src/pages/MyAuctionsPage/index.tsx
import React, { useEffect, useState } from 'react'
import MyAuctionCard from '../../components/common/MyAuctionCard'
import { fetchMyAuctions, type Auction } from '../../services/auctionService'

const MyAuctionsPage: React.FC = () => {
  const [myAuctions, setMyAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMyAuctions = async () => {
      try {
        const data = await fetchMyAuctions()

        const sorted = [...data].sort((a, b) => {
          const now = new Date()
          const aDone = new Date(a.endDate) < now
          const bDone = new Date(b.endDate) < now

          if (aDone === bDone) return 0
          return aDone ? 1 : -1
        })

        setMyAuctions(sorted)
      } catch (error) {
        console.error('Failed to load my auctions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMyAuctions()
  }, [])

  if (loading) return <div className="text-center mt-20">Loading...</div>

  return (
    <div className="px-6">
      {myAuctions.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-40 text-center text-gray-700">
          <h2 className="text-xl font-semibold mb-2">No auctions created yet</h2>
          <p className="text-sm text-gray-500 max-w-md">
            Your auctions will appear here once you create them.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-3 gap-y-6 mt-4">
          {myAuctions.map((auction) => (
            <MyAuctionCard
              key={auction.id}
              title={auction.title}
              image={auction.image}
              price={auction.currentHighestBid ?? auction.startingPrice}
              endDate={auction.endDate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAuctionsPage
