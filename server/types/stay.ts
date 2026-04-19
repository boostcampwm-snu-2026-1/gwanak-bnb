export interface StayRecord {
  id: string;
  image: string;
  location: string;
  keywords: readonly string[];
  price: number;
  rating: number;
  maximumGuest: {
    adult: number;
    children: number;
  };
  isPetAvailable: boolean;
}

export interface SearchStaysParams {
  location?: string;
  adult?: number;
  children?: number;
  infant?: number;
  pets?: number;
}

export interface StaySearchItem {
  id: string;
  image: string;
  location: string;
  price: number;
  rating: number;
  maximumGuest: {
    adult: number;
    children: number;
  };
  isPetAvailable: boolean;
}
