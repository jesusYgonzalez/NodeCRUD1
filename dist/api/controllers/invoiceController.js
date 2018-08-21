'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _invoice = require('../models/invoice');

var _invoice2 = _interopRequireDefault(_invoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    findAll: function findAll(req, res, next) {
        _invoice2.default.find().then(function (invoices) {
            return res.json(invoices);
        });
    },
    create: function create(req, res) {
        var schema = _joi2.default.object().keys({
            item: _joi2.default.string().required(),
            date: _joi2.default.date().required(),
            due: _joi2.default.date().required(),
            qty: _joi2.default.number().integer().required(),
            tax: _joi2.default.number().optional(),
            rate: _joi2.default.number().optional()
        });

        var _Joi$validate = _joi2.default.validate(req.body, schema),
            error = _Joi$validate.error,
            value = _Joi$validate.value;

        if (error && error.details) {
            return res.status(400).json(error);
        }
        _invoice2.default.create(value).then(function (invoice) {
            return res.json(invoice);
        }).catch(function (err) {
            return res.status(500).json(err);
        });
    }
};
//# sourceMappingURL=invoiceController.js.map