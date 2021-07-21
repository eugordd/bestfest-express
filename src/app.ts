import path from 'path';

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config/config';
import artistRoutes from './routes/artist';
import festivalRoutes from './routes/festival';
import mainRoutes from './routes/main';

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/artists', artistRoutes);
app.use('/festivals', festivalRoutes);
app.use('/', mainRoutes);

// DB CONNECT
const mongoHost: string = config.database.host;
const dbName: string = config.database.name;
mongoose.connect(`mongodb://${mongoHost}:27017/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(8080);
    })
    .catch(err => console.log(err));
