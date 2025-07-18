import express from 'express';
import dotenv from 'dotenv';
import studentRoutes from './routes/student.routes.js';
import courseRoutes from './routes/course.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import authRouter from './routes/authentication.routes.js';
import { authentication } from './middleware/authenticationMiddleware.js';
import { serveSwagger, setupSwagger } from './config/swagger.js';
import cors from "cors"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())

app.use('/docs', serveSwagger, setupSwagger);

app.use('/students', authentication, studentRoutes);
app.use('/courses', authentication, courseRoutes);
app.use('/teachers', authentication, teacherRoutes);
app.use('/auth', authRouter);

app.get('/', (req, res) => res.send('Welcome to School API!'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
