import express, { Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import './environment';
import cors from 'cors';
import morgan from 'morgan';
import credentials from './middleware/credentials';
import handleErrors from './middleware/handleErrors';
import router from './routes/router';
import validateEnv from './config/validateEnv';
import corsOptions from './config/corsOptions';
import rateLimiter from './config/rateLimiter';
import cookieParser from 'cookie-parser'; 
import './config/database';
dotenv.config();
validateEnv();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
// app.use(morgan('combined'));
app.use(credentials);
app.use(rateLimiter);
app.use(cors(corsOptions));
app.set('x-powered-by', false);
app.use(cookieParser()); 

app.use('/', router);

app.use(handleErrors);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
