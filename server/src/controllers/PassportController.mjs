'use strict';

import { db } from '../db.mjs';

import { Web3Storage } from 'web3.storage';
import { File } from 'web3.storage';

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
    const params = req.query;
    try {
        const result = await db.collection('reference').where('username', '==', params['username']).get()
        const person = result.docs.map((p) => p.data());

        if (person.length) {
            res.status(200).send("Found someone! " + person[0]['username']);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const createUser = async (req, res, next) => {
    const body = req.body;
    console.log(body);
    try {
        const result = await db.collection('reference').where('username', '==', body['username']).get()
        if (result.length) {
            res.status(400).send("Username already exists");
        } else {
            await db.collection('reference').add({
                name: body['fullName'],
                username: body['username'],
                password: body['password'],
                dateOfBirth: body['dob'],
                healthCardNumber: body['healthcard']
            });
            res.status(201).send("User created");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const createVaccineRecord = async (req, res, next) => {
    const body = req.body;
    console.log(body);
    try {
        const result = await db.collection('reference/'+body['id']).get();
        if (result.length) {
            await db.collection('reference/'+body['id']+'/illnesses').add({
                illness: body['illness'],
                cid: web3cid
            });
            res.status(201).send("Record created");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export { addVaccination, addPerson, getPerson }