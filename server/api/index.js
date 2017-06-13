
const express = require('express');
const router = express.Router();
const Users = require('./users');

let Router = (app) => {
  // user route
  app.use('/api/users', Users);
  //404 Route (ALWAYS Keep this as the last route)
  app.use((req, res) => {
    res.status(404).send({
      code: 404,
      success: false,
      message: 'Not Found',
      description: 'Error 404'
    });
  });
};

module.exports = Router;
