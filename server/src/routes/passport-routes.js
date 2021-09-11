const express = require('express');

const { addVaccination, addPerson } = require('../controllers/PassportController');

const router = express.Router();

router.post('/addperson', addPerson);

module.exports = {
    routes: router
}