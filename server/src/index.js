import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDoc, setDoc, doc, where, query } from "firebase/firestore"
import { Web3Storage } from 'web3.storage';
import { File } from 'web3.storage';

function getAccessToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEI1NDc5MUQwQTdiODY4N0YzMDc4QmQ0MTA5YzcwMzQxOTNlNzRlZmIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzEzNzU5NjU3MjIsIm5hbWUiOiJCZWVwQm9vcCJ9.2ZkyKFw3IZ2UItW2HM0utlfuDzsrGol3YNSsRoXSGLU';
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
}

function makeFileObjects(json) {
    const blob = new Blob([JSON.stringify(obj)], {type: 'application/json'});

    return new File([blob], 'text.json')
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
    if (!res.ok) {
        throw new Error('failed to get cid: ' + cid);
    }

    console.log(res.json());
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

const getPerson = async (req, res, next) => {
    console.log(req.query);
    const params = req.query;
    try {
        const docRef = doc(db, "reference", params['firstname']);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Doc Data: ", docSnap.data()['firstname']);
        }
        res.status(200).send("All good");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const createUser = async (req, res, next) => {
    const body = req.body;
    console.log(body);
    try {
        const referenceRef = collection(db, "reference");
        const q = query(referenceRef, where("username", "==", body['username']));
        const querySnapshot = await getDoc(q);
        const found = querySnapshot.map((doc) => doc.data());
        if (found) {
            res.status(400).send("Username exists");
        } else {
            await setDoc(doc(db, "reference", body['username']+""+body['fullname']), {
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
        const querySnapshot = await getDoc(q);
        const found = querySnapshot.map((doc) => doc.data());
        if (found) {
            res.status(200).send('Found a login user');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        console.log('getting all users');
        const referenceRef = collection(db, "reference");
        const q = query(referenceRef, where("username", "!=", 0));
        const querySnapshot = await getDoc(q);
        const found = querySnapshot.map((doc) => "" + doc.data()['username'] + "--" + doc.id);
        res.status(200).send(found.json());
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

const createVaccineRecord = async (req, res, next) => {
    const body = req.body;
    console.log(body);
    try {
        const result = await db.collection('reference/'+body['id']).get();
        const cid = storeFiles(makeFileObjects(body))
        console.log(cid);
        if (result.length) {
            await db.collection('reference/'+body['id']+'/illnesses').add({
                illness: body['illness'],
                cid: cid
            });
            res.status(201).send("Record created");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const adminRouter = express.Router();
const userRouter = express.Router();

adminRouter.post('/addperson', addPerson);
adminRouter.get('/getperson', getPerson);
adminRouter.post('/createuser', createUser);
adminRouter.post('/createvaccinerecord', createVaccineRecord);
adminRouter.get('/getallusers', getAllUsers)


app.use('/admin', adminRouter);
app.use('/user', userRouter);


app.listen(8080, () => console.log('Server is starting on url http://localhost:' + '8080'));