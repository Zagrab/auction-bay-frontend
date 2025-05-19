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

export interface BiddingAuction {
  id: number
  title: string
  image: string | null
  myHighestBid: number
  status: 'Winning' | 'Outbid'
}


export const fetchAuctions = async (): Promise<Auction[]> => {
  const res = await api.get<Auction[]>('/auctions')
  return res.data
}

export const fetchWonAuctions = async (): Promise<WonAuction[]> => {
  const res = await api.get<WonAuction[]>('/auctions/me/won')
  return res.data
}

export const fetchBiddingAuctions = async (): Promise<BiddingAuction[]> => {
  const res = await api.get<BiddingAuction[]>('/auctions/me/bidding')
  return res.data
}

export const fetchMyAuctions = async (): Promise<Auction[]> => {
  const res = await api.get<Auction[]>('/auctions/me/my-auctions')
  return res.data
}

export const createAuction = async (formData: FormData): Promise<void> => {
  await api.post('/auctions/me/auction', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteAuction = async (auctionId: number): Promise<void> => {
  await api.delete(`/auctions/me/delete/${auctionId}`)
}

export const updateAuction = async (id: number, formData: FormData): Promise<void> => {
  await api.patch(`/auctions/me/auction/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const uploadProfilePicture = async (formData: FormData): Promise<void> => {
  await api.post('/auth/me/picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const fetchAuctionById = async (id: number): Promise<Auction & {
  bids: {
    id: number
    amount: number
    createdAt: string
    userId: number
  }[]
}> => {
  const res = await api.get(`/auctions/${id}`)
  return res.data
}

export const placeBidOnAuction = async (auctionId: number, amount: number): Promise<void> => {
  await api.post(`/auctions/${auctionId}/bid`, { amount })
}


