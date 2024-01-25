import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getFirestore, collection, getDocs, addDoc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';


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
const colRef = collection(db, "material")
const storage = getStorage();

function addMaterialItem(name, year, subject,downloadURL) {
    const materialList = document.querySelector(".material-list");

    const newMaterialItem = document.createElement("div");
    newMaterialItem.classList.add("material-item");

    newMaterialItem.innerHTML = `
        <h2>${subject}</h2>
        <p>Uploaded by: ${name}</p>
        <p>Year: ${year}th Year</p>
        <a href="${downloadURL}">Download</a>
    `;

    materialList.appendChild(newMaterialItem);
}



//Material 
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
//add a material 
const addDoubt = document.querySelector(".material-hi-material");

addDoubt.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.querySelector('.image123');
  const file = fileInput.files[0];
  if (file) {

    const storageRef = ref(storage, 'material-documents/' + file.name);
    await uploadBytes(storageRef, file);
    const names = addDoubt.yournames.value;
    const year = addDoubt.year.value;
    const subject = addDoubt.subject.value;
    const downloadURL = await getDownloadURL(storageRef);
    

    await addDoc(colRef, {
      Name: names,
      Year: year,
      Subject: subject,
      DocumentURL: downloadURL,
    });

    addDoubt.reset();
    alert("Material Added");
    addMaterialItem(names, year, subject,downloadURL);
  } else {

    alert("Please select a document to upload.");
  }
});




  // Function to fetch and display material items
async function displayMaterialItems() {
    const materialList = document.querySelector(".material-list");
    materialList.innerHTML = ""; // Clear existing items
  
    try {
      const snapshot = await getDocs(colRef);
      snapshot.docs.forEach((doc) => {
        const { Name, Year, Subject, DocumentURL} = doc.data();
        addMaterialItem(Name, Year, Subject,DocumentURL);
      });
    } catch (error) {
      console.error("Error fetching material items:", error.message);
    }
  }
  
  // Call the function to display material items on page load
  window.addEventListener('load', displayMaterialItems);