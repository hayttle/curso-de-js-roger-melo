import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js"
import {getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyAOYZw8IuQNCpIEhqCFoyG61cP_O6YVdGI",
  authDomain: "testing-firebase-3b468.firebaseapp.com",
  projectId: "testing-firebase-3b468",
  storageBucket: "testing-firebase-3b468.appspot.com",
  messagingSenderId: "183822428230",
  appId: "1:183822428230:web:e4261879236031032bc247"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

getDocs(collection(db, "games"))
  .then((result) => {
    const gameLis = result.docs.reduce((acc, doc) => {
      const {title, developedBy, createdAt} = doc.data()
      acc += `<li class="my-4">
      <h5>${title}</h5>
      
      <ul>
        <li>Desenvolvido por ${developedBy}</li>
        <li>Adicionado no banco em ${createdAt.toDate()}</li>
      </ul>
    </li>`
      return acc
    }, "")
    const gameList = document.querySelector('[data-js="game-list"]')

    gameList.innerHTML = gameLis
  })
  .catch((err) => console.log(err))
