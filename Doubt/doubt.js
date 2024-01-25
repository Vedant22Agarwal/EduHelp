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
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, 'doubt')
const colRf = collection(db, 'solvedoubt')
const storage = getStorage();


getDocs(colRf)
  .then((snapshot) => {
    let solvedoubt = []
    snapshot.docs.forEach((doc) => {
      solvedoubt.push({ ...doc.data(), id: doc.id })

    });
    console.log(solvedoubt);
  })
  .catch(err => {
    console.log(err.message);
  })

//add a solution
const addDoubt = document.querySelector(".solution-hi-solution")
addDoubt.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.querySelector('.image123');
  const file = fileInput.files[0];
  if (file) {

    const storageRef = ref(storage, 'solve-documents/' + file.name);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    await addDoc(colRf, {
      Name: addDoubt.yournames.value,
      Text: addDoubt.solutionInput.value,
      DocumentURL: downloadURL,
    });

    addDoubt.reset();
    alert("Solution Added");
  } else {

    alert("Please select a document to upload.");
  }
});

async function loadData() {
  try {

    const querySnapshot = await getDocs(colRef);


    const allDoubtsList = document.getElementsByClassName('doubt-item');
    allDoubtsList.innerHTML = '';


    querySnapshot.forEach(doc => {
      const data = doc.data();
      
      const materialList = document.querySelector(".doubt-list");
      const card = document.createElement('li');
      card.classList.add('doubt-item');

      card.innerHTML = `
                <h3>Subject: ${data.Subject}</h3>
                <p>Asked by: ${data.Name}</p>
                <p>Year: ${data.Year}</p>
                <p>Text: ${data.Text}</p>
                <a href="${data.DocumentURL}">Download</a>
                <button class="solve-btn" onclick="showSolutionInterface()">Solve</button>
                <button class="review-btn" onclick="showReviewInterface()">Review</button>
            `;


      materialList.appendChild(card);
    });
  }
  catch (errore) {
    console.error('Error fetching data:', errore);
  }
  try {

    const querySnapsht = await getDocs(colRf);


    const allReviewsList = document.getElementsByClassName('review-item');
    allReviewsList.innerHTML = '';


    querySnapsht.forEach(doc => {
      const dat = doc.data();


      const reviewList = document.querySelector(".review-list");
      const car = document.createElement('li');
      car.classList.add('review-item');

      car.innerHTML = `
                <h3>Solution provided by: ${dat.Name}</h3>                
                <p>Text: ${dat.Text}</p>
                <a href="${dat.DocumentURL}">Download</a>
            `;


      reviewList.appendChild(car);
    });
  }
  catch (error) {
    console.error('Error fetching data:', error);
  }
}


window.addEventListener('load', loadData);

