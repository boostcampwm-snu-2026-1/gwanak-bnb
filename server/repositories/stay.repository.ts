import type { Collection } from "mongodb";

import type { StayRecord } from "../types/stay.js";
import { searchIncludes } from "../utils/search.js";

export class StayRepository {
  constructor(private readonly stayCollection: Collection<StayRecord>) {}

  async search(location: string): Promise<StayRecord[]> {
    const trimmedLocation = location.trim();
    const stays = await this.stayCollection.find().toArray();

    console.log("[stayRepository.search] db fetch", {
      location: trimmedLocation,
      count: stays.length,
      rawData: stays,
    });

    if (!trimmedLocation) {
      return stays;
    }

    const matchedStays = stays.filter((stay) => {
      const searchableText = [stay.location, ...stay.keywords];

      return searchableText.some((field) => searchIncludes(field, trimmedLocation));
    });

    console.log("[stayRepository.search] location-matched", {
      location: trimmedLocation,
      count: matchedStays.length,
      matchedData: matchedStays,
    });

    return matchedStays;
  }
}
