import path from 'path';

import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config/config';
import artistRoutes from './routes/admin/artist';
import festivalRoutes from './routes/admin/festival';
import genreRoues from './routes/admin/genre';
import authRoutes from './routes/admin/auth';
import mainRoutes from './routes/main';
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    return next();
})

// admin routes
app.use('/api/admin/artists', artistRoutes);
app.use('/api/admin/festivals', festivalRoutes);
app.use('/api/admin/genres', genreRoues);
app.use('/api/admin/auth', authRoutes);

// app routes
app.use('/api/app', mainRoutes);

app.use(errorHandler);

// app.listen(8080, () => {
//     console.log('Server started successfully!');
// });

const isDocker = process.env.DOCKER;
const mongoHost: string = isDocker ? config.database.host : 'localhost';
const dbName: string = config.database.name;

app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    if (req.xhr) return next();
    res.sendFile(path.join(__dirname, '/index.html'));
})

mongoose.connect(`mongodb://${mongoHost}:27017/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server started successfully!');
        });
    })
    .catch(err => console.log(err));
