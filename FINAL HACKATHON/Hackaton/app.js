import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

// Initialize Firebase with your configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOsb65cDibDiUVGeKyuWf4NYs2RntnEcA",
    authDomain: "allset-29966.firebaseapp.com",
    databaseURL: "https://allset-29966-default-rtdb.firebaseio.com",
    projectId: "allset-29966",
    storageBucket: "allset-29966.appspot.com",
    messagingSenderId: "413876145098",
    appId: "1:413876145098:web:9b7860deec3850f9119d33",
    measurementId: "G-1DFBPHQ616"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();
const storage = getStorage();

console.log("Firebase initialized");

const signup = () => {
    const username = document.getElementById("first-name").value; // Changed to "first-name"
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const repeatPassword = document.getElementById("repeat-password").value;
    const image = document.getElementById("image");

    if (password !== repeatPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Successfully signed up:", user);

            const imageFile = image.files[0];
            const mediaRef = storageRef(storage, "images/" + imageFile.name);

            uploadBytes(mediaRef, imageFile)
                .then((uploadSnapshot) => {
                    console.log("Successfully uploaded image:", uploadSnapshot.ref);

                    getDownloadURL(uploadSnapshot.ref)
                        .then((downloadURL) => {
                            const userData = {
                                name: username,
                                email: email,
                                imageUrl: downloadURL
                            };
                            const userReference = ref(database, "users/" + user.uid);

                            set(userReference, userData)
                                .then(() => {
                                    console.log("Successfully added data in database");
                                    // Redirect to a success page or perform other actions
                                })
                                .catch((error) => {
                                    console.error("Error adding data to database:", error);
                                    alert("Signup failed. Please try again.");
                                });
                        })
                        .catch((error) => {
                            console.error("Error getting image download URL:", error);
                            alert("Signup failed. Please try again.");
                        });
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                    alert("Signup failed. Please try again.");
                });
        })
        .catch((error) => {
            console.error("Error signing up:", error);
            alert("Signup failed. Please try again.");
        });
};

const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        signup();
    });
}

// Rest of your login code


const login = () => {
    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Successfully logged in:", user);
            window.location.href = "admin.html"

            const userReference = ref(database, "users/" + user.uid);

            onValue(userReference, (snapshot) => {
                const userData = snapshot.val();
                console.log("User data:", userData);
                // Update the UI with user data or perform other actions
            });
        })
        .catch((error) => {
            console.error("Error logging in:", error);
            alert("Login failed. Please try again.");
        });
};

const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        login();
    });
}
