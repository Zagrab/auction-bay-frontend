import React, { useEffect, useState } from 'react'
import AuctionCard from '../../components/common/AuctionCard'
import { fetchWonAuctions, type WonAuction } from '../../services/auctionService'

const WonPage: React.FC = () => {
  const [wonAuctions, setWonAuctions] = useState<WonAuction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadWon = async () => {
      try {
        const data = await fetchWonAuctions()
        setWonAuctions(data)
      } catch (error) {
        console.error('Failed to load won auctions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadWon()
  }, [])

  if (loading) return <div className="text-center mt-20">Loading...</div>

  return (
    <div className="px-6">
      {wonAuctions.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-40 text-center text-gray-700">
          <h2 className="text-xl font-semibold mb-2">Nothing here yet?</h2>
          <p className="text-sm text-gray-500 max-w-xs">
            When you win auction items<br />
            they’ll be displayed here! Go on<br />
            and bid on your favorite items!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-3 gap-y-6 mt-4">
          {wonAuctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              id={auction.id}
              title={auction.title}
              image={auction.image}
              price={auction.winningBid}
              endDate={new Date().toISOString()}
              status="done"
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default WonPage
