import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAwEJuHH0u_SKOTusIQD9ZSOY4AjCraefw',
  authDomain: 'collab-write-11459.firebaseapp.com',
  projectId: 'collab-write-11459',
  storageBucket: 'collab-write-11459.appspot.com',
  messagingSenderId: '597708155859',
  appId: '1:597708155859:web:562148290433b2d87a1d26',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (
  typeof window !== 'undefined' &&
  window.location.hostname.includes('local')
) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

export { db };
