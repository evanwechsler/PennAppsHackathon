'use strict';

const db = require('../db');
const Passport = require('../models/passport');

const addPerson = async (req, res, next) => {
    try {
        const data = req.body;
        await db.collection('reference').doc(data['name']).get().then(doc => {
            if (doc.exists) {
                res.status(409).send('User already exists');
            }
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addVaccination = async (req, res, next) => {
    try {
        const data = req.body;
        await db.collection('reference').doc(data['name']).get().then(doc => {
            if (!doc.exists) {
                res.status(404).send('User not found');
            } else {

            }
        });
        res.send('Vaccination Added');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const test = async (req, res, next) => {
    console.log('hello');
    try {
        await db.collection('reference').add({
            name: "Test",
            password: "testPass"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPerson = async (req, res, next) => {
    console.log('getPerson');
    try {
        const data = req.body
        await db.collection('reference').where('username', '==', data['username']).get().then((querySnapshot) => {
            if (querySnapshot.size() >= 1) {
                console.log('found someone');
            }
        }).catch((error) => {
            console.log("Error getting Doc");
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addVaccination,
    addPerson,
    test
}