"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
    if (!token) {
        return res.status(401).json({ error: 'Authentication token is missing' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.email = decoded.email;
        req.id = decoded.id;
        req.role = decoded.role;
        next();
    }
    catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};
exports.default = authenticateToken;
