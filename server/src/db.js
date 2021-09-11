const firebase = require('firebase/app');
const dbGetter = require('firebase/firestore');
const config = require('./config');

const db = firebase.initializeApp(config.firebaseConfig);
const firestore = dbGetter.getFirestore();

module.exports = dbGetter;