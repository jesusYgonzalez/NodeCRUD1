import express from 'express';
import invoiceController from "../api/controllers/invoiceController";

export const router = express.Router();

//Invoices routes
router.get('/invoices', invoiceController.findAll);
router.get('/invoices/:id', invoiceController.findOne);
router.delete('/invoices/:id', invoiceController.delete);
router.put('/invoices/:id', invoiceController.update);
router.post('/invoices', invoiceController.create);
