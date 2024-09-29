"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'API documentation',
    },
    servers: [
        {
            url: process.env.NODE_ENV === 'production' ? process.env.PROD_URL : `http://localhost:${process.env.PORT}`,
            description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'token',
                description: 'Token containing the email, role, and id of the user',
            },
        },
    },
    security: [
        {
            cookieAuth: [],
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts', './src/models/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.swaggerSpec = swaggerSpec;
