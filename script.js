import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
  getFirestore, collection, getDocs, addDoc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';


// import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";




const firebaseConfig = {
  apiKey: "AIzaSyAYknJaJlXq-L87henwlfxabtkCPJLkBbY",
  authDomain: "eduhelp-98d53.firebaseapp.com",
  projectId: "eduhelp-98d53",
  storageBucket: "eduhelp-98d53.appspot.com",
  messagingSenderId: "620502226831",
  appId: "1:620502226831:web:326922fb5a66f8bc659dfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const colRef = collection(db, "doubt")
const storage = getStorage();

// const storage = getStorage(app);
// const storageRef = ref(storage, 'gs://eduhelp-98d53.appspot.com'); 

//Ask a doubt 
getDocs(colRef)
  .then((snapshot) => {
    let doubt = []
    snapshot.docs.forEach((doc) => {
      doubt.push({ ...doc.data(), id: doc.id })

    });
    console.log(doubt);
  })
  .catch(err => {
    console.log(err.message);
  })
//add a doubt
const addDoubt = document.querySelector(".doubt-hi-doubt");

addDoubt.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.querySelector('.image123');
  const file = fileInput.files[0];
  if (file) {

    const storageRef = ref(storage, 'doubt-documents/' + file.name);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    await addDoc(colRef, {
      Name: addDoubt.yournames.value,
      Year: addDoubt.year.value,
      Subject: addDoubt.subject.value,
      DocumentURL: downloadURL,
    });

    addDoubt.reset();
    alert("Doubt Added");
  } else {

    alert("Please select a document to upload.");
  }
});
