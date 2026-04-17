import type { ComponentType, SVGProps } from "react";

export type LocationIconKey =
  | "building"
  | "landmark"
  | "navigation"
  | "tree-palm"
  | "waves";

export interface RecommendedLocationItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
}

export interface LocationSearchItem {
  id: string;
  title: string;
  subtitle: string;
  iconKey: LocationIconKey;
}

export interface LocationSearchResponse {
  data: LocationSearchItem[];
  meta: {
    query: string;
    count: number;
  };
}

export interface GuestFilter {
  adult: number;
  kids: number;
  infant: number;
  pets: number;
}

export interface StaySearchResult {
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

export interface StaySearchResponse {
  data: StaySearchResult[];
  meta: {
    location: string;
    count: number;
  };
}
