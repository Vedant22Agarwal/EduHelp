




const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});


const firebaseConfig = {
    apiKey: "AIzaSyAYknJaJlXq-L87henwlfxabtkCPJLkBbY",
    authDomain: "eduhelp-98d53.firebaseapp.com",
    projectId: "eduhelp-98d53",
    storageBucket: "eduhelp-98d53.appspot.com",
    messagingSenderId: "620502226831",
    appId: "1:620502226831:web:326922fb5a66f8bc659dfa"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword     } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"

initializeApp(firebaseConfig)

const auth = getAuth()

//Authentication
const signupForm = document.querySelector(".signup")
signupForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            const userID =  cred.user.uid
            console.log("user created", cred.user);
            alert("Registered Successfully")
            signupForm.reset();
            
            // window.location.href = "index.html"
        })
        .catch((err) => {
            console.log(err.message);
            alert("Already in use");

        }) 
})


// login kar ne ke liye
    const loginForm = document.querySelector(".loginin")
 loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {

            console.log("User logged in :", cred.user);
            loginForm.reset()
            alert("Logged in");
            window.location.href = "index.html"

        })
        .catch((err) => {
            console.log(err.message);
            alert("Invalid Email or Password")

        });
});

