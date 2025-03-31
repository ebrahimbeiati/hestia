import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { authMiddleware } from './middleware/authMiddleware';
import tenantRoutes from './routes/tenantRoutes';
import managerRoutes from './routes/managerRoutes';
import propertyRoutes from './routes/propertyRoutes';

// Load environment variables
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// Routes
app.get('/', (req, res) => {
    res.send('This is for Home route');
});

app.use("/properties", propertyRoutes);
app.use("/tenants", authMiddleware(['tenant']), tenantRoutes);
app.use("managers", authMiddleware(['manager']), managerRoutes);
//server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

