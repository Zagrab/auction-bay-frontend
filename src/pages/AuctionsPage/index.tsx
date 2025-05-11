import React, { useEffect, useState } from 'react'
import AuctionCard from '../../components/common/AuctionCard'
import { fetchAuctions, type Auction } from '../../services/auctionService'

const AuctionsPage: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await fetchAuctions()
        setAuctions(data)
      } catch (error) {
        console.error('Failed to load auctions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAuctions()
  }, [])

  if (loading) return <div className="text-center mt-20">Loading...</div>

  return (
    <div className="px-6">
      {auctions.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-40 text-center text-gray-700">
          <h2 className="text-xl font-semibold mb-2">Oh no, no auctions yet!</h2>
          <p className="text-sm text-gray-500 max-w-md">
            To add new auction click “+” button in navigation bar or wait for other users to add new auctions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-3 gap-y-6 mt-4">
          {auctions.map(auction => (
            <AuctionCard
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

export default AuctionsPage
