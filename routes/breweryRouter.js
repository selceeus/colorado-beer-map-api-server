const express = require('express');
const bodyParser = require('body-parser');
const Brewery = require('../models/brewery');
const authenticate = require('../authenticate');

const breweryRouter = express.Router();

breweryRouter.use(bodyParser.json());

breweryRouter.route('/')
.get( authenticate.verifyUser, (req, res, next) => {
    Brewery.find()
    .then(breweries => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(breweries);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Brewery.create(req.body)
    .then(breweries => {
        console.log('Brewery Created', breweries);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(breweries);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /breweries`);
})
.delete(authenticate.verifyUser, (req,res, next) => {
    Brewery.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

breweryRouter.route('/:breweryId')
.get(authenticate.verifyUser, (req, res, next) => {
    Brewery.findById(req.params.breweryId)
    .then(breweries => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(breweries);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`Post operation not supported on /breweries/${req.params.breweryId}`);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Brewery.findByIdAndUpdate(req.params.breweryId, {
        $set: req.body
    }, { new: true })
    .then(breweries => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(breweries);
    })
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Brewery.findByIdAndDelete(req.params.breweryId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = breweryRouter;