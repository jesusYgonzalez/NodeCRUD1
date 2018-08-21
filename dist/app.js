'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('./config/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect("mongodb://localhost:27017/NodeCRUD1", { useNewUrlParser: true }).then(function () {
    console.log('connected to db');
}).catch(function () {
    console.log('connection failed');
});

var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
app.use((0, _morgan2.default)('dev'));
app.use('/api', _routes.router);

app.use(function (req, res, next) {
    var error = new Error('Not Found');
    error.message = 'invalid route';
    error.status = 404;
    next(error);
});
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    return res.json({
        error: { message: error.message }
    });
});

app.listen(3000, function () {
    return console.log('server running on port: 3000');
});
//# sourceMappingURL=app.js.map