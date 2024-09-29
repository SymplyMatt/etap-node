"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../config/utils");
const authenticateAdmin = (req, res, next) => {
    const user_role = req.role || '';
    try {
        if (!utils_1.adminRoles.includes(user_role)) {
            return res.sendStatus(401);
        }
        next();
    }
    catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};
exports.default = authenticateAdmin;
