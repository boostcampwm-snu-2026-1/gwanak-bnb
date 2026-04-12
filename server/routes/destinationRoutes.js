import express from "express";
import Destination from "../models/Destination.js";

const router = express.Router();

/**
 * GET /api/destinations/autocomplete?q=서
 */
router.get("/autocomplete", async (req, res) => {
  try {
    const q = String(req.query.q || "").trim();

    if (!q) {
      return res.json([]);
    }

    const results = await Destination.aggregate([
      {
        $search: {
          index: "destination_autocomplete",
          autocomplete: {
            query: q,
            path: "name",
            fuzzy: {
              maxEdits: 1,
              prefixLength: 1
            }
          }
        }
      },
      {
        $addFields: {
          score: { $meta: "searchScore" }
        }
      },
      {
        $sort: {
          score: -1,
          popularity: -1
        }
      },
      {
        $limit: 8
      },
      {
        $project: {
          _id: 1,
          name: 1,
          country: 1,
          description: 1,
          tags: 1,
          popularity: 1,
          score: 1
        }
      }
    ]);

    res.json(results);
  } catch (error) {
    console.error("Autocomplete error:", error);
    res.status(500).json({ message: "자동완성 검색 중 오류가 발생했습니다." });
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Destination.find()
      .sort({ popularity: -1 })
      .limit(10);

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "데이터 불러오기 실패" });
  }
});

export default router;