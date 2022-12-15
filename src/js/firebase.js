import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAuth, signOut } from 'firebase/auth';
import Notiflix from 'notiflix';

export default class Firebase {
  constructor() {
    (this.firebaseConfig = {
      apiKey: 'AIzaSyDyyDBXrtypR4LKLi9eobNW0F2AbPIT-0w',
      authDomain: 'js-team-project-bb445.firebaseapp.com',
      projectId: 'js-team-project-bb445',
      storageBucket: 'js-team-project-bb445.appspot.com',
      messagingSenderId: '772335269944',
      appId: '1:772335269944:web:f4a41767a7c3556cf60ecd',
      measurementId: 'G-1YF4Z6D4WL',
    }),
      // Initialize Firebase
      (this.app = initializeApp(this.firebaseConfig)),
      (this.auth = getAuth(this.app));
    (this.savedSettings = localStorage.getItem('user')),
      (this.user = JSON.parse(this.savedSettings)),
      (this.errorCode = null),
      (this.errorMessage = null);
  }

  // реєстрація користувачів

  async createUser(email, password) {
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        Notiflix.Notify.success(
          'Registration is successful, now you will be accompanied by the dog "Patron"'
        );
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Notiflix.Notify.failure(errorCode);
      });
  }

  // авторизація

  async signIn(email, password) {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        Notiflix.Notify.success(
          'authorization is successful, now you will be accompanied by the dog "Patron"'
        );
      })
      .catch(error => {
        this.errorCode = error.code;
        Notiflix.Notify.failure(this.errorCode);
      });
  }

  //перевірка аутентифікації
  authState() {
    const user = this.auth.currentUser;

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  // вихід з системи
  async out() {
    await signOut(this.auth)
      .then(() => {
        localStorage.removeItem('user');
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      });
  }

  getUser() {
    return this.user;
  }

  getErrorCode() {
    return this.errorCode;
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
