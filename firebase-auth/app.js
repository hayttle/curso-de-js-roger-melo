import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js"
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyBursUNdSdN0brDtMGDr_3T5xXyEE-qAZM",
  authDomain: "fir-auth-ca043.firebaseapp.com",
  projectId: "fir-auth-ca043",
  storageBucket: "fir-auth-ca043.appspot.com",
  messagingSenderId: "538379343962",
  appId: "1:538379343962:web:49250e63502de7f42ce063"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()
const auth = getAuth()

const linkLogin = document.querySelector('[data-js="login-link"]')
const buttonLogin = document.querySelector('[data-js="button-form"]')

linkLogin.addEventListener("click", () => {
  const modal = document.querySelectorAll('[data-js="modal-login"]')
  M.Modal.init(modal)
})

buttonLogin.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
})
