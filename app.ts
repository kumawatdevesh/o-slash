import express, { Application } from 'express';
import bodyParser from 'body-parser';
import {router as authRoutes} from './routes/auth';
import {router as shortcutRoutes} from './routes/shortcut';
import {router as tagRoutes} from './routes/tag';

const app : Application = express();

app.use(bodyParser.json())
app.use('/api/v1/', authRoutes);
app.use('/api/v1/', shortcutRoutes);
app.use('/api/v1/', tagRoutes);

export {
    app
}