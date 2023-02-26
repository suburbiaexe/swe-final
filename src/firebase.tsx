/* Everything here is essentially copied from the following tutorial:
    https://blog.logrocket.com/user-authentication-firebase-react-apps/ */
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCsFQ1NMp7FXrvZ8MzSgrqoWAgxelNhZZg",
    authDomain: "fab-auth-19873.firebaseapp.com",
    projectId: "fab-auth-19873",
    storageBucket: "fab-auth-19873.appspot.com",
    messagingSenderId: "389951830694",
    appId: "1:389951830694:web:34f06d42618875b0f15267",
    measurementId: "G-Y5M52JY0DB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign in with Google
const googleProvider = new GoogleAuthProvider();
// enforce @brown.edu domain
googleProvider.setCustomParameters({
    hd: "brown.edu"
});
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

// Logout
const logout = () => {
    // remove the loggedIn cookie
    localStorage.removeItem('loggedIn');
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logout,
};