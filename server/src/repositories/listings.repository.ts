import type { Types } from 'mongoose'
import type { ListingFields } from '../models/listing.model.js'
import { ListingModel } from '../models/listing.model.js'

export type ListingLean = ListingFields & { _id: Types.ObjectId }

export type SearchListingsFilter = {
  destinationId: string
  minGuests: number
}

export async function searchListings(
  filter: SearchListingsFilter,
): Promise<ListingLean[]> {
  const docs = await ListingModel.find({
    destinationId: filter.destinationId,
    maxGuests: { $gte: filter.minGuests },
  })
    .sort({ rating: -1, reviewCount: -1 })
    .lean()
    .exec()

  return docs as unknown as ListingLean[]
}

export async function countListings(): Promise<number> {
  return ListingModel.countDocuments()
}

export async function insertManyListings(items: ListingFields[]): Promise<void> {
  await ListingModel.insertMany(items)
}

export async function deleteAllListings(): Promise<void> {
  await ListingModel.deleteMany({})
}
