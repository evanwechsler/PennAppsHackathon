import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDoc, doc } from "firebase/firestore"
import { Web3Storage } from 'web3.storage';
import { File } from 'web3.storage';

const app = express();

const firebase = initializeApp({
    apiKey: 'AIzaSyC1sv4guvM1piO3mvavt8mtamzpfsPScxc',
    authDomain: 'pennappsvax.firebaseapp.com',
    projectId: 'pennappsvax'
});

const db = getFirestore();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

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

const getPerson = async (req, res, next) => {
    console.log(req.query);
    const params = req.query;
    try {
        const docRef = doc(db, "reference", params['username']);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Doc Data: ", docSnap.data()['username']);
        }
        res.status(200).send("All good");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// const getPerson = async (req, res, next) => {
//     console.log(req.query);
//     const params = req.query;
//     try {
//         const result = await db.collection('reference').where('username', '==', params['username']).get()
//         const person = result.docs.map((p) => p.data());

//         if (person.length) {
//             res.status(200).send("Found someone! " + person[0]['username']);
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

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

const router = express.Router();
router.post('/addperson', addPerson);
router.get('/getperson', getPerson);

app.use('/api', router);


app.listen(8080, () => console.log('Server is starting on url http://localhost:' + '8080'));