const { body, validationResult } = require('express-validator');

// Middleware kiểm tra lỗi từ express-validator
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            err: 1,
            msg: "Validation failed",
            errors: errors.array()
        });
    }
    next();
};

module.exports = validate;
