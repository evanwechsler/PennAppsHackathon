const firebase = require('firebase');
const config = require('./config');
require('firebase/firestore');

firebase.initializeApp({
    apiKey: 'AIzaSyC1sv4guvM1piO3mvavt8mtamzpfsPScxc',
    authDomain: 'pennappsvax.firebaseapp.com',
    projectId: 'pennappsvax'
});

var db = firebase.firestore();
module.exports = db;