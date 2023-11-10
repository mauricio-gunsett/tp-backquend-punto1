import express from 'express';
import {
  deleteTask,
  getTasks,
  postTask,
  putTask,
} from '../controllers/taskControllers.js';
import { validateBody } from '../middlewares/validateBody.js';
import { post_taskSchema, put_taskSchema } from '../helpers/validationSchemas/taskSchemas.js';

const router = express.Router();

// GET
router.get('/', getTasks);

// POST
router.post(
  '/',
  (req, res, next) => validateBody(req, res, next, post_taskSchema),
  postTask,
);

// PUT
router.put('/:id', (req, res, next) => validateBody(req, res, next, put_taskSchema), putTask);

// DELETE
router.delete('/:id', deleteTask);

export default router;
