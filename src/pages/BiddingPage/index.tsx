import React, { useEffect, useState } from 'react'
import AuctionCard from '../../components/common/AuctionCard'
import { fetchBiddingAuctions, type BiddingAuction } from '../../services/auctionService'

const BiddingPage: React.FC = () => {
  const [auctions, setAuctions] = useState<BiddingAuction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBidding = async () => {
      try {
        const data = await fetchBiddingAuctions()
        setAuctions(data)
      } catch (error) {
        console.error('Failed to load bidding auctions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBidding()
  }, [])

  if (loading) return <div className="text-center mt-20">Loading...</div>

  return (
    <div className="px-6">
      {auctions.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-40 text-center text-gray-700">
          <h2 className="text-xl font-semibold mb-2">No active bids</h2>
          <p className="text-sm text-gray-500 max-w-md">
            Auctions you’re bidding on will show up here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-3 gap-y-6 mt-4">
          {auctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              id={auction.id}
              title={auction.title}
              image={auction.image}
              price={auction.myHighestBid}
              status={auction.status.toLowerCase() as 'winning' | 'outbid'}
              endDate={auction.endDate}
              />
          ))}
        </div>
      )}
    </div>
  )
}

export default BiddingPage
