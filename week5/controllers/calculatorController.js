const calculatorModel = require('../models/calculatorModel');

const addTwoNumber = (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    const sum = n1 + n2;

    const data = {
        number1: n1,
        number2: n2,
        result: sum,
        type: 'SUM'
    };

    calculatorModel.postData(data, (err) => {
        if (!err) {
            res.status(201).json({ statusCode: 201, data: sum });
        } else {
            res.status(500).json({ statusCode: 500, message: 'Error processing request' });
        }
    });
};

const subTwoNumber = (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    const difference = n1 - n2;

    const data = {
        number1: n1,
        number2: n2,
        result: difference,
        type: 'SUB'
    };

    calculatorModel.postData(data, (err) => {
        if (!err) {
            res.status(201).json({ statusCode: 201, data: difference });
        } else {
            res.status(500).json({ statusCode: 500, message: 'Error processing request' });
        }
    });
};

const mulTwoNumber = (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    const product = n1 * n2;

    const data = {
        number1: n1,
        number2: n2,
        result: product,
        type: 'MUL'
    };

    calculatorModel.postData(data, (err) => {
        if (!err) {
            res.status(201).json({ statusCode: 201, data: product });
        } else {
            res.status(500).json({ statusCode: 500, message: 'Error processing request' });
        }
    });
};

const getAllData = (req, res) => {
    calculatorModel.getAllData((err, result) => {
        if (!err) {
            res.status(200).json({ statusCode: 200, data: result });
        } else {
            res.status(500).json({ statusCode: 500, message: 'Error retrieving data' });
        }
    });
};

module.exports = {
    addTwoNumber,
    subTwoNumber,
    mulTwoNumber,
    getAllData
};
