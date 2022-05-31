import { SwaggerDefinition } from "swagger-jsdoc"
import { SwaggerOptions } from "swagger-ui-express"

const swaggerDefinition: SwaggerDefinition = {
	info: {
		title: 'API Docs',
		version: '1.0.0',
		description: 'Documentation for REST APIs',
		servers: ["http://localhost:5000"]
	},
	host: process.env.STAGING_SWAGGER_URL,
	basePath: '/api/v1',

	"securityDefinitions": {
		"api_key": {
			"type": "apiKey",
			"name": "authorization",
			"in": "header"
		}
	},
	"security": [
		{
			"api_key": []
		}
	]
}

const options: SwaggerOptions = {
	swaggerDefinition,
	apis: ['./docs/*.ts']
}

export {
    options
}
// {
// 	"email": "kumawatdevesh99@gmail.com",
// 	"password": "123456"
//   }