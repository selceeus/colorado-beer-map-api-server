const express = require('express');
const bodyParser = require('body-parser');

const breweryRouter = express.Router();

breweryRouter.use(bodyParser.json());

breweryRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get( (req, res) => {
    res.end(`Will send all the breweries to you`);
})
.post((req, res) => {
    res.end(`Will add the breweries: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /breweries`);
})
.delete((req,res) => {
    res.end('Deleting all breweries');
});

breweryRouter.route('/:breweryId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the brewery: ${req.params.breweryId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`Post operation not supported on /breweries/${req.params.breweryId}`);
})
.put((req, res) => {
    res.write(`Updating the brewery: ${req.params.breweryId}\n`);
    res.end(`Will update the brewery: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting brewery: ${req.params.breweryId}`);
});

module.exports = breweryRouter;