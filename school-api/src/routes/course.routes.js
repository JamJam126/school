import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from '../controllers/course.controller.js';
import { authentication } from '../middleware/authenticationMiddleware.js';

const router = express.Router();

router.post('/', authentication, createCourse);
router.get('/', authentication, getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
