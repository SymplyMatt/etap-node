"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleErrors = (err, req, res, next) => {
    console.error(err.stack);
    res.status(501).send('Something broke!');
};
exports.default = handleErrors;
