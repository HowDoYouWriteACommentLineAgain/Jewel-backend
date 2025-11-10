import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import config from './config.js';

// const app = initializeApp(config.firebaseConfig);
const app = initializeApp({
    apiKey: "fake-api-key",
    authDomain: "localhost",
    projectId: "demo-no-project"
})
const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

export default db;