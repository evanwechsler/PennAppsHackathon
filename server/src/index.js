import express, { response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDoc, setDoc, doc, where, query, getDocs, addDoc } from "firebase/firestore"
import { Web3Storage } from 'web3.storage';
import { File } from 'web3.storage';

function getAccessToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEI1NDc5MUQwQTdiODY4N0YzMDc4QmQ0MTA5YzcwMzQxOTNlNzRlZmIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzEzNzU5NjU3MjIsIm5hbWUiOiJCZWVwQm9vcCJ9.2ZkyKFw3IZ2UItW2HM0utlfuDzsrGol3YNSsRoXSGLU';
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
}

function makeFileObjects(obj) {
    const buffer = Buffer.from(JSON.stringify(obj));

    const files = [new File([buffer], 'text.json')]
    return files;
}

async function storeFiles(files) {
    const client = makeStorageClient()
    const cid = await client.put(files);

    console.log('stored file with CID: ' + cid);

    return cid;
}

async function retrieve(cid) {
    const client = makeStorageClient();
    const res = await client.get(cid);
    console.log('Got a response from Web3! ' + res.status + " " + res.statusText);
    const files = await res.files();
    for (const file of files) {
        const text = await file.text();
        return JSON.parse(text);
    }
    if (!res.ok) {
        throw new Error('failed to get cid: ' + cid);
    }

    // console.log(res.json());
}

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getPerson = async (req, res, next) => {
    console.log(req.query);
    const params = req.query;
    const responseData = {};

    try {
        var referenceRef = collection(db, "reference");
        const q = query(referenceRef, where("username", "==", params['username']));
        const querySnapshot = await getDocs(q);
        const arr = [];
        querySnapshot.forEach((doc) => arr.push(doc.data()));
        if (arr.length > 0) {
            responseData['name'] = arr[0]['name'];
            responseData['userName'] = arr[0]['username'];
            responseData['dateOfBirth'] = arr[0]['dateOfBirth'];
            responseData['illnesses'] = [];
        }
        const docRef = await getDocs(collection(db, "reference", params['id'], "illnesses"));
        var illnessVaccination = {};
        docRef.forEach(async (doc) => {
            illnessVaccination[doc.data()['illness']] = [];
            const cids = doc.data()['cid'];
            cids.forEach(async (cid) => {
                illnessVaccination[doc.data()['illness']].push(await retrieve(cid));
            })
            responseData['illnesses'].push(illnessVaccination);
        })
        await sleep(500);
        console.log(responseData)
        res.status(200).send(responseData);
    } catch(error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

const createUser = async (req, res, next) => {
    const body = req.body;
    try {
        const referenceRef = collection(db, "reference");
        const q = query(referenceRef, where("username", "==", body['username']));
        const querySnapshot = await getDocs(q);
        const arr = [];
        querySnapshot.forEach((doc) => arr.push(doc.data()));
        if (arr.length > 0) {
            res.status(400).send("Username exists already");
            console.log(arr);
        } else {
            await setDoc(doc(db, "reference", body['username'] + "" + body['fullName']), {
                name: body['fullName'],
                username: body['username'],
                password: body['password'],
                dateOfBirth: body['dob'],
                healthCardNumber: body['healthcard']
            });
            res.status(201).send("User Created");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const login = async (req, res, next) => {
    const body = req.body;
    console.log(body);
    try {
        const referenceRef = collection(db, "reference");
        const q = query(referenceRef, where("username", "==", body['username']), where("password", "==", body['password']));
        const querySnapshot = await getDocs(q);
        const arr = [];
        querySnapshot.forEach((doc) => arr.push([doc.data(), doc.id]));
        if (arr.length > 0) {
            console.log(arr[0]['id'])
            res.status(200).send(JSON.parse('{ "id": "'+ arr[0][1] + '" }'));
        } else {
            res.status(400).send('No user found');
        }
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
}

const getAllUsers = async (req, res, next) =>  {
    try {
        console.log('getting all users');
        var users = [];
        const referenceRef = collection(db, "reference");
        const q = query(referenceRef, where("username", "!=", 0));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => users.push({ "name": doc.data()['username'], "id": doc.id}))
        res.status(200).send(JSON.stringify(users));
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

const createVaccineRecord = async (req, res, next) => {
    const body = req.body;

    try {
        const cid = await storeFiles(makeFileObjects(body));
        console.log(cid);
        const docRef = await addDoc(collection(db, "reference", body['id'], "illnesses"), {
            illness: body['illness'],
            cid: cid
        });
        console.log('Added document with ID: ' + docRef.id);
        res.status(201).send("All g");
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error);
    }
}

const adminRouter = express.Router();

adminRouter.get('/getperson', getPerson);
adminRouter.post('/createuser', createUser);
adminRouter.post('/createvaccinerecord', createVaccineRecord);
adminRouter.get('/getallusers', getAllUsers)

adminRouter.post('/login', login);


app.use('/api', adminRouter);


app.listen(8080, () => console.log('Server is starting on url http://localhost:' + '8080'));
