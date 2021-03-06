import Joi from 'joi';
import HttpStatus from 'http-status-codes';

import Invoice from '../models/invoice';

export default {
    findAll(req, res, next) {
        Invoice.find()
            .then(invoices => res.json(invoices))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    create(req, res) {
        const schema = Joi.object().keys({
            item: Joi.string().required(),
            date: Joi.date().required(),
            due: Joi.date().required(),
            qty: Joi.number()
                .integer()
                .required(),
            tax: Joi.number().optional(),
            rate: Joi.number().optional()
        });
        const { error, value } = Joi.validate(req.body, schema);
        if(error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        Invoice.create(value)
            .then(invoice => res.json(invoice))
            .catch( err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
    findOne(req, res) {
        let {id} = req.params;
        Invoice.findById(id)
            .then(invoice => {
                if(invoice) {
                    res.status(200).json(invoice);
                } else {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: 'Invoice not found'});
                }
            });
    },
    delete(req, res) {
        Invoice.findByIdAndRemove(req.params.id)
            .then(invoice => {
                if (!invoice) {
                    return res.status(HttpStatus.NOT_FOUND).json( {err: 'could not delete your invoice'} );
                }
                return res.json(invoice);
            })
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR.json(err)));
    },
    update(req, res) {
        const { id } = req.params;
        const schema = Joi.object().keys({
            item: Joi.string().optional(),
            date: Joi.date().optional(),
            due: Joi.date().optional(),
            qty: Joi.number()
                .integer()
                .optional(),
            tax: Joi.number().optional(),
            rate: Joi.number().optional(),
        });
        const { error, value } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        Invoice.findOneAndUpdate({ _id: id }, value, { new: true })
            .then(invoice => res.json(invoice))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },
};


