const express = require('express');
const bodyParser = require('body-parser');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get( (req, res) => {
    res.end(`Will send all the users to you`);
})
.post((req, res) => {
    res.end(`Will add the users: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /users`);
})
.delete((req,res) => {
    res.end('Deleting all users');
});

userRouter.route('/:userId')
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
    res.end(`Post operation not supported on /users/${req.params.breweryId}`);
})
.put((req, res) => {
    res.write(`Updating the user: ${req.params.breweryId}\n`);
    res.end(`Will update the user: ${req.body.name}
        with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting user: ${req.params.breweryId}`);
});

module.exports = userRouter;