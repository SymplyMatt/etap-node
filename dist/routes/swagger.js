"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = require("../config/swaggerConfig");
const router = (0, express_1.Router)();
router.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.swaggerSpec));
router.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerConfig_1.swaggerSpec);
});
exports.default = router;
