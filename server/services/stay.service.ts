import { StayRepository } from "../repositories/stay.repository.js";
import type { SearchStaysParams, StaySearchItem } from "../types/stay.js";

export class StayService {
  constructor(private readonly stayRepository: StayRepository) {}

  async searchStays({
    location,
    adult = 0,
    children = 0,
    pets = 0,
  }: SearchStaysParams): Promise<StaySearchItem[]> {
    const normalizedAdult = Number.isNaN(adult) ? 0 : Math.max(adult, 0);
    const normalizedChildren = Number.isNaN(children) ? 0 : Math.max(children, 0);
    const normalizedPets = Number.isNaN(pets) ? 0 : Math.max(pets, 0);

    const stays = await this.stayRepository.search(location ?? "");
    const filteredStays = stays
      .filter((stay) => stay.maximumGuest.adult >= normalizedAdult)
      .filter((stay) => stay.maximumGuest.children >= normalizedChildren)
      .filter((stay) => normalizedPets === 0 || stay.isPetAvailable);

    console.log("[stayService.searchStays] after filters", {
      location: location ?? "",
      adult: normalizedAdult,
      children: normalizedChildren,
      pets: normalizedPets,
      beforeCount: stays.length,
      afterCount: filteredStays.length,
      filteredData: filteredStays,
    });

    return filteredStays
      .map(({ id, image, location: stayLocation, price, rating, maximumGuest, isPetAvailable }) => ({
        id,
        image,
        location: stayLocation,
        price,
        rating,
        maximumGuest,
        isPetAvailable,
      }));
  }
}
