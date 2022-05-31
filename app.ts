import express, { Application } from 'express';
import bodyParser from 'body-parser';
import {router as authRoutes} from './routes/auth';
import {router as shortcutRoutes} from './routes/shortcut';
import {router as tagRoutes} from './routes/tag';
import {errorResponse} from './middlewares/error';
import swaggerUI, { SwaggerUiOptions } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {options} from './swagger'

const swaggerSpec: SwaggerUiOptions = swaggerJSDoc(options)

const app : Application = express();

app.get('/api/v1/swagger.json', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec)
})

app.use(bodyParser.json())
app.use('/api/v1/', authRoutes);
app.use('/api/v1/', shortcutRoutes);
app.use('/api/v1/', tagRoutes);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(errorResponse)

export {
    app
}