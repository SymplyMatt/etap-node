"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateCustomer = (req, res, next) => {
    const user_role = req.role || '';
    try {
        if (user_role !== 'customer') {
            return res.sendStatus(401);
        }
        next();
    }
    catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};
exports.default = authenticateCustomer;
