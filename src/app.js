import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';

import { router } from './config/routes';

mongoose.connect("mongodb://localhost:27017/NodeCRUD1", { useNewUrlParser: true })
    .then(() => {
        console.log('connected to db');
    })
    .catch(() => {
        console.log('connection failed');
    });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/api', router);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.message = 'invalid route';
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: { message: error.message },
    });
});




app.listen(3000, () => console.log('server running on port: 3000'));
