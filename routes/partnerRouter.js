const express = require('express');
const bodyParser = require('body-parser');
const Partner = require('../models/partner');
const authenticate = require('../authenticate');

const partnerRouter = express.Router();

partnerRouter.use(bodyParser.json());

partnerRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    Partner.find()
    .then(partners => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partners);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Partner.create(req.body)
    .then(partners => {
        console.log('Partner Created', partners);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partners);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /partners`);
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Partner.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

partnerRouter.route('/:partnersId')
.get(authenticate.verifyUser, (req, res, next) => {
    Partner.findById(req.params.partnersId)
    .then(partners => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partners);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`Post operation not supported on /partners/${req.params.partnersId}`);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Partner.findByIdAndUpdate(req.params.partnersId, {
        $set: req.body
    }, { new: true })
    .then(partners => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partners);
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnersId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = partnerRouter;