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

const linkLogin = document.querySelector('[data-js="login-link"]')
const buttonLoginGoogle = document.querySelector('[data-js="button-form"]')
const linkLogout = document.querySelector('[data-js="logout"]')
const modal = document.querySelector('[data-js="modal-login"]')
const linksLogged = document.querySelectorAll('[data-js="logged-in"]')
const h6 = document.querySelector('[data-js="title-add-phases"]')
const phrasesList = document.querySelector('[data-js="phrases-list"]')

onAuthStateChanged(auth, (user) => {
  if (user) {
    // const {displayName, email, uid} = user

    M.Modal.init(modal).close()
    linksLogged.forEach((link) => {
      link.classList.remove("hide")
    })

    linkLogin.classList.add("hide")
    h6.classList.add("hide")
    phrasesList.classList.remove("hide")
  }
})

linkLogin.addEventListener("click", () => {
  M.Modal.init(modal)
})

linkLogout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Usuário deslogado com sucesso!")

      linksLogged.forEach((link) => {
        link.classList.add("hide")
      })
      linkLogin.classList.remove("hide")
      h6.classList.remove("hide")
      phrasesList.classList.add("hide")
    })
    .catch((error) => console.log(error))
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
