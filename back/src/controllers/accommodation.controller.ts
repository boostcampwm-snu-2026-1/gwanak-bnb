import { Request, Response } from 'express';
import { getAccommodations } from '../services/accommodation.service.js';

export const searchAccommodations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { location, guests } = req.query;

    // 1차 검색 필수 조건 검증
    if (!location || !guests) {
      res.status(400).json({ error: "여행지와 여행인원은 필수 조건입니다." });
      return;
    }

    const accommodations = await getAccommodations(String(location), Number(guests));
    res.status(200).json(accommodations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 내부 오류가 발생했습니다." });
  }
};