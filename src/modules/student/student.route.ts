import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

// get => /api/v1/student
router.get('/', StudentController.getAllStudent);
router.post('/', StudentController.createStudent);
router.get('/:email', StudentController.getSingleStudent);

export const StudentRoutes = router;
