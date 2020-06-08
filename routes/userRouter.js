const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/')
.get( (req, res, next) => {
    User.find()
    .then(users => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    User.create(req.body)
    .then(users => {
        console.log('Partner Created', partners);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /users`);
})
.delete((req, res, next) => {
    User.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

userRouter.route('/:userId')
.get((req, res, next) => {
    User.findById(req.params.userId)
    .then(users => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    })
    .catch(err => next(err));
})
.post((req, res) => {s
    res.statusCode = 403;
    res.end(`Post operation not supported on /users/${req.params.userId}`);
})
.put((req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, { new: true })
    .then(users => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = userRouter;