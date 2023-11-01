const { validationResult } = require('express-validator');

const Validate = validationResult.withDefaults({
    formatter: error => error.msg,
});

module.exports = Validate;