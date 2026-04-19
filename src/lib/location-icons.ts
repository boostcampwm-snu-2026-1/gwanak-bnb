import {
  Building2,
  Landmark,
  Navigation,
  TreePalm,
  Waves,
} from "lucide-react";

import type { LocationIconKey, RecommendedLocationItem } from "@/types";

const locationIconMap: Record<LocationIconKey, RecommendedLocationItem["icon"]> = {
  building: Building2,
  landmark: Landmark,
  navigation: Navigation,
  "tree-palm": TreePalm,
  waves: Waves,
};

export const getLocationIcon = (iconKey: LocationIconKey) => locationIconMap[iconKey];
