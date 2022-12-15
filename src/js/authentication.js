import { async } from '@firebase/util';
import Firebase from './firebase';
import Notiflix from 'notiflix';

const firebase = new Firebase();

const authenticationBackdrop = document.querySelector(
  '#authentication_backdrop'
);

const modalExit = document.querySelector('#modal-btn-exit');
const modalOpen = document.querySelector('.modal-open-btn');
// const modalOpenBtnLibrary = document.querySelector('#modalOpenBtnLibrary');
const formContainer = document.querySelector('#form-container');
const navAuthContainer = document.querySelector('#navAuthContainer');
const btnProfile = document.querySelector('#btn-profile');
const patronContainer = document.querySelector('#patron');

modalOpen.addEventListener('click', modalAuthOpen);
// modalOpenBtnLibrary.addEventListener('click', modalAuthOpen);
modalExit.addEventListener('click', modalClose);

start();
async function start() {
  await authenticationState();
}

//перевірка наявності користувача
async function authenticationState() {
  const savedSettings = await localStorage.getItem('user');
  const user = await JSON.parse(savedSettings);
  await renderInterface(user);
}

function renderInterface(user) {
  if (user) {
    const email = user.email;
    navAuthContainer.innerHTML = `<button type="button" class="interface-btn interface-btn-user" id="btn-profile">
      ${email}
    </button>
    <button type="button" class="interface-btn interface-btn-out" id="btn-out">
      go out
    </button>`;
    modalOpen.classList.add('is_hidden');
    const btnOut = document.querySelector('#btn-out');
    btnOut.addEventListener('click', out);

    patronContainer.classList.remove('is_hidden');
    modalClose();
  } else {
    patronContainer.classList.add('is_hidden');
    modalOpen.classList.remove('is_hidden');
    navAuthContainer.innerHTML = '';
  }
}

// Авторизація
async function logInSite(evt) {
  evt.preventDefault();
  try {
    const email = evt.currentTarget.elements.email.value;
    const password = evt.currentTarget.elements.password.value;

    const userAuth = await firebase.signIn(email, password);
    const user = await authenticationState();
  } catch {
    console.log('кетч авторизації');
  }
}

// реєстрація
async function registrationUser(evt) {
  evt.preventDefault();

  const email = evt.currentTarget.elements.email.value;
  const password = evt.currentTarget.elements.password.value;
  const confirmPassword = evt.currentTarget.elements.confirmPassword.value;
  if (password === confirmPassword) {
    try {
      await firebase.createUser(email, password);
      await authenticationState();
    } catch (error) {}
  } else {
    Notiflix.Notify.failure('you entered different passwords');
  }
}

// модалка авторизації
export function modalAuthOpen() {
  renderAuthentication();

  window.addEventListener('keydown', escapeKeyCloseModal);
  // window.addEventListener('click', modalClose);

  const regForm = document.querySelector('#btn-reg-open-form');
  regForm.addEventListener('click', openRegForm);
  authenticationBackdrop.classList.remove('is_hidden');
  const authenticationForm = document.querySelector('#authentication-form');
  authenticationForm.addEventListener('submit', logInSite);
}

// модалка реєстрації
function openRegForm() {
  renderRegistrationForm();

  const registrationForm = document.querySelector('#registration-form');
  registrationForm.addEventListener('submit', registrationUser);
}

// закриває модалку автентифікації
function modalClose() {
  authenticationBackdrop.classList.add('is_hidden');
  window.removeEventListener('keydown', escapeKeyCloseModal);
  // window.removeEventListener('click', modalClose);
}

// рендер модалки авторизації
function renderAuthentication() {
  formContainer.innerHTML = ` <form class="authentication-form" id="authentication-form">
  <div class="input-form">
        <input
          class="auth_input"
          type="email"
          name="email"
          placeholder="Email..."
          autocomplete="off"
        />
        <input
          class="auth_input"
          type="password"
          name="password"
          placeholder="Password..."
          minlength="6"
          autocomplete="off"
        />
      </div>
      <button
        class="auth-submit"
        type="submit"
        class="logine-authentication"
        id="logine-authentication"
      >
        Log in to the site
      </button>
      <button type="button" class="btn-recower-password">
        Recower password
      </button>
      <button type="button" class="btn-reg-open-form" id="btn-reg-open-form">
        Registration
      </button>
      
      </form>`;
}

// рендер модалки реєстрації
function renderRegistrationForm() {
  formContainer.innerHTML = '';
  formContainer.innerHTML = `  <form class="authentication-form" id="registration-form">
  <div class="input-form">
        <input
          class="auth_input"
          type="email"
          name="email"
          placeholder="Email..."
          autocomplete="off"
        />
        <input
          class="auth_input"
          type="password"
          name="password"
          placeholder="Password..."
          minlength="6"
          autocomplete="off"
        />
        <input
          class="auth_input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password..."
          minlength="6"
          autocomplete="off"
        />
      </div>
      <button
        class="auth-submit"
        type="submit"
        class="registrationUser"
        id="registrationUser"
      >
        Registration
      </button>
      </form>
      
     `;
}

//вийти з акаунта
async function out() {
  await firebase.out();
  await authenticationState();
  Notiflix.Notify.success('You are logged out');
}

function escapeKeyCloseModal(event) {
  if (event.code === 'Escape') {
    if (!authenticationBackdrop.classList.contains('is_hidden')) {
      modalClose();
    }
  }
}
