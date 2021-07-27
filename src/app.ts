import path from 'path';

import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config/config';
import artistRoutes from './routes/artist';
import festivalRoutes from './routes/festival';
import mainRoutes from './routes/main';
import adminRoutes from './routes/admin';
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    next();
})

app.use('/artists', artistRoutes);
app.use('/festivals', festivalRoutes);
app.use('/admin', adminRoutes);
app.use('/', mainRoutes);

app.use(errorHandler);

// DB CONNECT
const mongoHost: string = config.database.host;
const dbName: string = config.database.name;
mongoose.connect(`mongodb://${mongoHost}:27017/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(8080);
    })
    .catch(err => console.log(err));
