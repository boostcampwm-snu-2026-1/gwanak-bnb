import type { Request, Response } from "express";

import { StayService } from "../services/stay.service.js";

export class StayController {
  constructor(private readonly stayService: StayService) {}

  search = async (request: Request, response: Response) => {
    const location =
      typeof request.query.location === "string"
        ? request.query.location
        : undefined;
    const adult =
      typeof request.query.adult === "string"
        ? Number.parseInt(request.query.adult, 10)
        : undefined;
    const children =
      typeof request.query.children === "string"
        ? Number.parseInt(request.query.children, 10)
        : undefined;
    const infant =
      typeof request.query.infant === "string"
        ? Number.parseInt(request.query.infant, 10)
        : undefined;
    const pets =
      typeof request.query.pets === "string"
        ? Number.parseInt(request.query.pets, 10)
        : undefined;

    const stays = await this.stayService.searchStays({
      location,
      adult,
      children,
      infant,
      pets,
    });

    console.log("[stayController.search] response", {
      query: {
        location: location ?? "",
        adult,
        children,
        infant,
        pets,
      },
      count: stays.length,
      data: stays,
    });

    response.status(200).json({
      data: stays,
      meta: {
        location: location?.trim() ?? "",
        count: stays.length,
      },
    });
  };
}
