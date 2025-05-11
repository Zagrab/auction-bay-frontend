import { api } from './api'

export interface Auction {
  id: number
  title: string
  description: string
  image: string | null
  startingPrice: number
  endDate: string
  createdAt: string
  userId: number
  winnerId: number | null
  currentHighestBid: number | null
}

export const fetchAuctions = async (): Promise<Auction[]> => {
  const res = await api.get<Auction[]>('/auctions')
  return res.data
}
