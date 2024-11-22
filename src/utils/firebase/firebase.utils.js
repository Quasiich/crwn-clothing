import {initializeApp} from 'firebase/app'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

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

//
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            })
        } catch (error) {
            console.log('error from user:' + error)
        }
    }
    return userDocRef
}