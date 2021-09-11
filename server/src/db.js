import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebase = initializeApp({
    apiKey: 'AIzaSyC1sv4guvM1piO3mvavt8mtamzpfsPScxc',
    authDomain: 'pennappsvax.firebaseapp.com',
    projectId: 'pennappsvax'
});

export const db = getFirestore();