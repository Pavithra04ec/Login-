var joi = require('joi');
module.exports = joi.array().items(joi.object().keys({
    EmpId: joi.number().integer().required(),
    Name: joi.string().min(3).max(18).required(),
    Role: joi.string().min(3).max(40).required(),
    PreOrganization: joi.string().min(3).max(50).required(),
}).min(1).required());