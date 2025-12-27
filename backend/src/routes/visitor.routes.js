import express from 'express';
import { trackVisitor, getVisitorStats } from '../controllers/visitor.controllers.js';
import { VerifyToken, isAdmin } from '../middlewares/auth.middlewares.js';

const router = express.Router();

// Visitor track korar route
router.post('/track', trackVisitor);

// Stats dekhar route (Admin panel-er jonno lagte pare)
router.get('/stats', VerifyToken, isAdmin, getVisitorStats);

export default router;
