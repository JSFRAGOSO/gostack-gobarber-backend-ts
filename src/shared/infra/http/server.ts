import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import routes from './routes';
import '@shared/container';
import rateLimiter from './middlewares/rateLimiter';

const app = express();
app.use(express.json());
app.use(rateLimiter);
app.use(cors());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err.message);
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

app.listen(3333, () => {
    console.log('Server started on port 3333');
});
