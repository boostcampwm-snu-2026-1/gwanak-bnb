import express from 'express';
import { searchPlaces } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchPlaces);

export default router;
