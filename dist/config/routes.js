'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _invoiceController = require('../api/controllers/invoiceController');

var _invoiceController2 = _interopRequireDefault(_invoiceController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = exports.router = _express2.default.Router();

//Invoices routes
router.get('/invoices', _invoiceController2.default.findAll);
router.post('/invoices', _invoiceController2.default.create);
//# sourceMappingURL=routes.js.map