const Joi = require("joi");

const schemas = {
    user: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required(),
        ngo: Joi.string(),
    }),
};

const validate = (schemaName) => (req, res, next) => {
    const { error } = schemas[schemaName].validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    next();
};

module.exports = { validate, schemas };
