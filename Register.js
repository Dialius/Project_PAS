// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN4afIW5DyyQpVWhBPD__A109r661hKis",
  authDomain: "simple-trade-login.firebaseapp.com",
  projectId: "simple-trade-login",
  storageBucket: "simple-trade-login.firebasestorage.app",
  messagingSenderId: "672564713973",
  appId: "1:672564713973:web:b3d8f4dd7f916bdc99e8bc"
};


const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }

const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=> {
   event.preventDefault();
   const username=document.getElementById('Username').value;
   const email=document.getElementById('E-Mail').value;
   const password=document.getElementById('password').value;

   const auth=getAuth();
   const db=getFirestore();

   createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential)=>{
       const user=userCredential.user;
       const userData={
           username:username,
           email: email,
           password:password
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='Login.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        }); 
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
 });