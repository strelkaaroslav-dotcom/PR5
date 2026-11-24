const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');

let login = localStorage.getItem('deliveryLogin');

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
    loginInput.classList.remove('input-error');
    logInForm.reset();
}

function onLoginInput() {
    loginInput.classList.remove('input-error');
}

function authorized() {
    function logOut() {
        login = null;
        localStorage.removeItem('deliveryLogin');

        userName.textContent = '';
        userName.style.display = 'none';
        buttonOut.style.display = 'none';
        buttonAuth.style.display = 'flex';

        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    }

    userName.textContent = login;
    userName.style.display = 'inline';
    buttonOut.style.display = 'flex';
    buttonAuth.style.display = 'none';

    buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
    function logIn(event) {
        event.preventDefault();

        const value = loginInput.value.trim();

        if (!value) {
            loginInput.classList.add('input-error');
            loginInput.focus();
            return;
        }

        login = value;
        localStorage.setItem('deliveryLogin', login);

        toggleModalAuth();

        buttonAuth.removeEventListener('click', toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        logInForm.removeEventListener('submit', logIn);
        loginInput.removeEventListener('input', onLoginInput);

        checkAuth();
    }

    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
    loginInput.addEventListener('input', onLoginInput);
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

checkAuth();
