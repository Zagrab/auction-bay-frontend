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

export interface WonAuction {
  id: number
  title: string
  image: string | null
  winningBid: number
}

export const fetchAuctions = async (): Promise<Auction[]> => {
  const res = await api.get<Auction[]>('/auctions')
  return res.data
}

export const fetchWonAuctions = async (): Promise<WonAuction[]> => {
  const res = await api.get<WonAuction[]>('/auctions/me/won')
  return res.data
}
