"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
require("./environment");
const cors_1 = __importDefault(require("cors"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
const handleErrors_1 = __importDefault(require("./middleware/handleErrors"));
const router_1 = __importDefault(require("./routes/router"));
const validateEnv_1 = __importDefault(require("./config/validateEnv"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const rateLimiter_1 = __importDefault(require("./config/rateLimiter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = require("./config/database");
dotenv_1.default.config();
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)());
app.use(credentials_1.default);
app.use(rateLimiter_1.default);
app.use((0, cors_1.default)(corsOptions_1.default));
app.set('x-powered-by', false);
app.use((0, cookie_parser_1.default)());
app.use('/', router_1.default);
app.use(handleErrors_1.default);
database_1.sequelize.sync({ force: false })
    .then(() => {
    console.log('Database connected and models synchronized.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => console.error('Error connecting to the database:', err));
