const express = require('express');

const { addVaccination, addPerson, test } = require('../controllers/PassportController');

const router = express.Router();

router.post('/addperson', addPerson);
router.get('/test', test)

module.exports = {
    routes: router
}