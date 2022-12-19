import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js"
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js"
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyBursUNdSdN0brDtMGDr_3T5xXyEE-qAZM",
  authDomain: "fir-auth-ca043.firebaseapp.com",
  projectId: "fir-auth-ca043",
  storageBucket: "fir-auth-ca043.appspot.com",
  messagingSenderId: "538379343962",
  appId: "1:538379343962:web:49250e63502de7f42ce063"
}

const app = initializeApp(firebaseConfig)
// const db = getFirestore(app)
const provider = new GoogleAuthProvider()
const auth = getAuth()

let userInfo = {}

const loginLink = document.querySelector('[data-js="login-link"]')
const logoutLink = document.querySelector('[data-js="logout"]')
const loggedLinks = document.querySelectorAll('[data-js="logged-in"]')
const addPhraseLink = document.querySelector('[data-js="add-phrase-link"]')
const accountLink = document.querySelector('[data-js="account-link"]')
const buttonLoginGoogle = document.querySelector('[data-js="button-form"]')

const modalAuthGoogle = document.querySelector('[data-js="modal-login"]')
const modalAddPhrase = document.querySelector("#modal-add-phrase")
const modalAccount = document.querySelector("#modal-account")
const titleAddPhrase = document.querySelector('[data-js="title-add-phrases"]')

const phrasesList = document.querySelector('[data-js="phrases-list"]')
const formAddPhrase = document.querySelector('[data-js="add-phrase-form"]')

onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo = user

    M.Modal.init(modalAuthGoogle).close()
    loggedLinks.forEach((link) => {
      link.classList.remove("hide")
    })

    loginLink.classList.add("hide")
    titleAddPhrase.classList.add("hide")
    phrasesList.classList.remove("hide")

    const accountDetails = document.querySelector('[data-js="account-details"]')
    accountDetails.setAttribute("class", "white-text")
    accountDetails.textContent = `${userInfo.displayName} | ${userInfo.email}`

    return
  }
  userInfo = false
})

loginLink.addEventListener("click", () => {
  M.Modal.init(modalAuthGoogle)
})

logoutLink.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      loggedLinks.forEach((link) => {
        link.classList.add("hide")
      })
      loginLink.classList.remove("hide")
      titleAddPhrase.classList.remove("hide")
      phrasesList.classList.add("hide")
    })
    .catch((error) => console.log(error))
})

addPhraseLink.addEventListener("click", () => {
  formAddPhrase.reset()
  M.Modal.init(modalAddPhrase)
})

accountLink.addEventListener("click", () => {
  M.Modal.init(modalAccount)
})

formAddPhrase.addEventListener("submit", (e) => {
  e.preventDefault()

  if (!userInfo) {
    return
  }

  const title = e.target.title.value
  const phrase = e.target.phrase.value

  const li = document.createElement("li")

  const i = document.createElement("i")
  i.setAttribute("class", "material-icons")
  i.textContent = "local_movies"

  const span = document.createElement("span")
  span.textContent = phrase

  const divHeader = document.createElement("div")
  divHeader.setAttribute("class", "collapsible-header blue-grey darken-4 white-text")
  divHeader.appendChild(i)
  divHeader.innerHTML += title

  const divBody = document.createElement("div")
  divBody.setAttribute("class", "collapsible-body white-text")
  divBody.append(span)

  li.append(divHeader)
  li.append(divBody)

  phrasesList.append(li)

  M.Modal.init(modalAddPhrase).close()
})

buttonLoginGoogle.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.customData.email
      const credential = GoogleAuthProvider.credentialFromError(error)
    })
})

document.addEventListener("DOMContentLoaded", function () {
  M.Collapsible.init(phrasesList)
})
