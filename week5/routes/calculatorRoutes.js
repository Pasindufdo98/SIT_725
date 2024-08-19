// routes/calculatorRoutes.js
const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');

router.get('/addTwoNumber', calculatorController.addTwoNumber);
router.get('/subTwoNumber', calculatorController.subTwoNumber);
router.get('/mulTwoNumber', calculatorController.mulTwoNumber);
router.get('/calcData', calculatorController.getAllData);

module.exports = router;
