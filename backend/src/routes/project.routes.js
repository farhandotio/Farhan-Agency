import express from 'express';
import multer from 'multer';
import * as projectController from '../controllers/project.controllers.js';
import { VerifyToken, isAdmin } from '../middlewares/auth.middlewares.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// -------------------- Public routes -------------------- //

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// -------------------- Protected (admin only) -------------------- //

router.post('/', VerifyToken, isAdmin, upload.single('image'), projectController.createProject);

router.patch('/:id', VerifyToken, isAdmin, upload.single('image'), projectController.updateProject);

router.delete('/:id', VerifyToken, isAdmin, projectController.deleteProject);

export default router;
