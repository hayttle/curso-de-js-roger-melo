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

const sanitize = (string) => DOMPurify.sanitize(string)

const renderGames = (querySnapshot) => {
  if (querySnapshot.metadata.hasPendingWrites) {
    return
  }
  querySnapshot.docChanges().forEach(({type}) => {
    if (type === "removed") {
      log("Game removido")
    }
    
    if (type === "modified" || type === "added") {
      const games = querySnapshot.docs.map((doc) => {
        const [id, {title, developedBy, createdAt}] = [doc.id, doc.data()]

        const liGame = document.createElement("li")
        liGame.setAttribute("data-id", id)
        liGame.setAttribute("class", "my-4")

        const h5 = document.createElement("h5")
        h5.textContent = sanitize(title)

        const liDevelopedBy = document.createElement("li")
        liDevelopedBy.textContent = `Desenvolvido por ${sanitize(developedBy)}`

        const liDate = document.createElement("li")
        liDate.textContent = `Adicionado no banco em ${formatDate(createdAt)}`

        const ul = document.createElement("ul")
        ul.append(liDevelopedBy)
        ul.append(liDate)

        const button = document.createElement("button")
        button.setAttribute("data-remove", id)
        button.setAttribute("class", "btn btn-danger btn-sm")
        button.textContent = "Remover"

        liGame.append(h5)
        liGame.append(ul)
        liGame.append(button)

        return liGame
      }, "")
      games.forEach((game) => gameList.append(game))
    }
  })

}

const createGame = async (e) => {
  e.preventDefault()
  try {
    const {id} = await addDoc(collectionGames, {
      title: sanitize(e.target.title.value),
      developedBy: sanitize(e.target.developer.value),
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

onSnapshot(collectionGames, renderGames, handleSnapshotError)
formAddGame.addEventListener("submit", createGame)
gameList.addEventListener("click", deleteGame)
