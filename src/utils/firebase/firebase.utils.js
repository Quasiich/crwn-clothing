import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9fMC9sHnT1kRCobEkwvIRI4hJQdFtw4M",
    authDomain: "crwn-clothing-db-a4955.firebaseapp.com",
    projectId: "crwn-clothing-db-a4955",
    storageBucket: "crwn-clothing-db-a4955.firebasestorage.app",
    messagingSenderId: "1007623000900",
    appId: "1:1007623000900:web:1811eb99befbcdf930fd11"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)