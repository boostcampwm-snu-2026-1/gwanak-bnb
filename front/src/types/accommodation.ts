export interface IAccommodation {
  _id: string;
  name: string;
  location: string;
  max_guests: number;
  price_per_night: number;
  rating: number;
  review_count: number;
  image_url: string;
}
