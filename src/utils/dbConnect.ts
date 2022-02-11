import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import config from '../config';

const modelsPath = path.join(__dirname, '..', 'models');

const initModels = () => {
    fs
        .readdirSync(modelsPath)
        .filter(file => file.endsWith('.js'))
        .forEach(file => require(path.join(modelsPath, file)));
};

export const dbConnect = async () => {
    const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
    const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;
    const isDocker = process.env.DOCKER;
    const mongoHost: string = isDocker ? config.database.host : 'localhost';
    const dbName: string = config.database.name;

    console.log('isDocker:', isDocker);
    console.log('mongoUser:', mongoUser);
    console.log('mongoPassword:', mongoPassword);

    const mongoUrl = isDocker ?
        `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:27017` :
        `mongodb://${mongoHost}:27017`;

    console.log('mongoUrl:', mongoUrl)

    await mongoose.connect(mongoUrl, {});
    const connection = mongoose.connection;
    let retries = 0;

    connection.on('error', () => {
        if (retries >= 1) {
            console.error.bind(console, 'connection error:');
        } else {
            console.log('Mongo restoring, expected unsuccessful connection');
        }
        if (connection.readyState === 0) {
            setTimeout(async () => {
                retries += 1;
                if (connection.readyState !== 0) {
                    return;
                }
                await mongoose.connect(mongoUrl, {});
            }, 1000);
        }
    });

    connection.once('open', () => {
        console.log('mongo instance mounted');
    });

    await connection.useDb('bestfest');
    initModels();

    return connection;
};