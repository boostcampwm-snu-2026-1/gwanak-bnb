import mongoose, { Schema } from 'mongoose'

/** FE `destinations.ts`의 `id`와 동일한 문자열 */
export type ListingFields = {
  destinationId: string
  title: string
  slug: string
  maxGuests: number
  pricePerNight: number
  thumbnailUrl: string
  rating: number
  reviewCount: number
  description?: string
}

const listingSchema = new Schema<ListingFields>(
  {
    destinationId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    maxGuests: { type: Number, required: true, min: 1 },
    pricePerNight: { type: Number, required: true, min: 0 },
    thumbnailUrl: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewCount: { type: Number, required: true, min: 0 },
    description: { type: String },
  },
  { timestamps: true },
)

listingSchema.index({ destinationId: 1, maxGuests: 1 })

export const ListingModel =
  mongoose.models.Listing ?? mongoose.model<ListingFields>('Listing', listingSchema)
