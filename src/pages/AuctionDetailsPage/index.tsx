import React from 'react'
import { useParams } from 'react-router-dom'

const AuctionDetailsPage: React.FC = () => {
  const { id } = useParams()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Auction Details</h1>
      <p>This is the auction details page for auction ID: <strong>{id}</strong></p>
    </div>
  )
}

export default AuctionDetailsPage
