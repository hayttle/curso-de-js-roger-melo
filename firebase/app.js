import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js"
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js"

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
const collectionGames = collection(db, "games")

const formAddGame = document.querySelector('[data-js="add-game-form"]')
const gameList = document.querySelector('[data-js="game-list"]')

onSnapshot(collectionGames, (querySnapshot) => {
  const gameLis = querySnapshot.docs.reduce((acc, doc) => {
    const {title, developedBy} = doc.data()
    acc += `<li data-id="${doc.id}" class="my-4">
    <h5>${title}</h5>
    
    <ul>
      <li>Desenvolvido por ${developedBy}</li>
      <li>Adicionado no banco em </li>
    </ul>
    <button data-remove="${doc.id}" class="btn btn-danger btn-sm">Remover</button>
  </li>`
    return acc
  }, "")

  gameList.innerHTML = gameLis
})

formAddGame.addEventListener("submit", (e) => {
  e.preventDefault()

  addDoc(collectionGames, {
    title: e.target.title.value,
    developedBy: e.target.developer.value,
    createdAt: serverTimestamp()
  })
    .then((doc) => console.log(" Documento criado com o ID  ", doc.id))
    .catch(console.log)
})

gameList.addEventListener("click", (e) => {
  const idRemoveButton = e.target.dataset.remove
  if (idRemoveButton) {
    deleteDoc(doc(db, "games", idRemoveButton))
      .then(() => console.log("Game removido"))
      .catch(console.log)
  }
})
