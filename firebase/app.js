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

const log = (...data) => console.log(...data)

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const collectionGames = collection(db, "games")

const formAddGame = document.querySelector('[data-js="add-game-form"]')
const gameList = document.querySelector('[data-js="game-list"]')

const formatDate = (createdAt) =>
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(createdAt.toDate())

const renderGames = (querySnapshot) => {
  if (!querySnapshot.metadata.hasPendingWrites) {
    querySnapshot.docChanges().forEach(({type}) => {
      if (type === "removed") {
        log("Game removido")
      }
      if (type === "modified" || type === "added") {
        log("Game adicionado")
      }
    })
    gameList.innerHTML = querySnapshot.docs.reduce((acc, doc) => {
      const [id, {title, developedBy, createdAt}] = [doc.id, doc.data()]

      return `${acc}<li data-id="${id}" class="my-4">
                <h5>${title}</h5>
                
                <ul>
                  <li>Desenvolvido por ${developedBy}</li>
                  <li>Adicionado no banco em ${formatDate(createdAt)}</li>
                </ul>
                <button data-remove="${id}" class="btn btn-danger btn-sm">Remover</button>
              </li>`
      return acc
    }, "")
  }
}

const createGame = async (e) => {
  e.preventDefault()
  try {
    const {id} = await addDoc(collectionGames, {
      title: e.target.title.value,
      developedBy: e.target.developer.value,
      createdAt: serverTimestamp()
    })
    log("Documento criado com o ID  ", id)
    e.target.reset()
    e.target.title.focus()
  } catch (e) {
    log(e)
  }
}

const deleteGame = async (e) => {
  const idRemoveButton = e.target.dataset.remove

  if (!idRemoveButton) {
    return
  }

  try {
    await deleteDoc(doc(db, "games", idRemoveButton))
    // log("Game removido")
  } catch (e) {
    log(e)
  }
}

const handleSnapshotError = (e) => log(e)

onSnapshot(collectionGames, renderGamesList, handleSnapshotError)
formAddGame.addEventListener("submit", createGame)
gameList.addEventListener("click", deleteGame)
