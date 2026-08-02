/* =========================================================
   PRODUKTY - vykreslení karet zrcadel
   ========================================================= */
const products = [
    {
        id: 1,
        name: 'Naruto Uzumaki Manga Mirror',
        price: '42.99',
        character: 'Naruto Uzumaki',
        image: 'https://i.pinimg.com/736x/ec/1e/e8/ec1ee8ad642f4a2d07e6aefdc3b113ce.jpg'
    },
    {
        id: 2,
        name: 'Guts Berserk Manga Mirror',
        price: '59.99',
        character: 'Guts',
        image: 'https://images.squarespace-cdn.com/content/v1/5ace4845e17ba35c9d8eb95e/faa77b6e-fd83-4c29-8a67-12915720d339/guts+with+sword.PNG'
    },
    {
        id: 3,
        name: 'Satoru Gojo Jujutsu Kaisen Manga Mirror',
        price: '54.99',
        character: 'Satoru Gojo',
        image: 'https://tse4.mm.bing.net/th/id/OIP.an08NHnldOYl6oXKUrjRuAHaDv?r=0&w=622&h=314&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
        id: 4,
        name: 'Yuji Itadori Jujutsu Kaisen Manga Mirror',
        price: '52.99',
        character: 'Yuji Itadori',
        image: 'https://64.media.tumblr.com/a1e3c3c74831d7cef34f4f483dd81385/71d682f144fa04aa-d7/s1280x1920/a9632934823f54855431af30c5f4632f2bc381ad.jpg'
    },
    {
        id: 5,
        name: 'Maki Zenin Jujutsu Kaisen Manga Mirror',
        price: '59.99',
        character: 'Maki Zenin',
        image: 'https://static.deltiasgaming.com/2024/12/Maki-2-1536x864.jpg'
    },
    {
        id: 6,
        name: 'Itachi Uchiha Manga Mirror',
        price: '47.99',
        character: 'Itachu Uchiha',
        image: 'https://i.pinimg.com/736x/83/dd/4f/83dd4f172fd158fcded04ef396057080.jpg'
    },
    {
        id: 7,
        name: 'Kaori Itami Jujutsu Kaisen Manga Mirror',
        price: '50.99',
        character: 'Kaori Itami',
        image: 'https://gamek.mediacdn.vn/133514250583805952/2024/9/30/jujutsu-kaisen-questions-yuji-1727683340418372725624-1727685393571-17276853936931927567325.jpg'
    },
    {
        id: 8,
        name: 'Light Yagami Death Note Manga Mirror',
        price: '50.99',
        character: 'Light Yagami',
        image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/03/Light-as-he-appears-in-the-Death-Note-Manga.jpg'
    },
    {
        id: 9,
        name: 'L Lawliet Death Note Manga Mirror',
        price: '50.99',
        character: 'L Lawliet',
        image: 'https://preview.redd.it/xnes3uqksi651.jpg?auto=webp&s=c159db6968fca2935308d821bb6b151015bbf874'
    },
    {
        id: 10,
        name: 'Kakashi Hatake Naruto Manga Mirror',
        price: '50.99',
        character: 'Kakashi Hatake',
        image: 'https://i.pinimg.com/736x/2a/30/b7/2a30b70140028c5ec7ee7550e92001a6.jpg'
    }
];

const productContainer = document.getElementById('product-container');

if (productContainer) {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="image-wrap">
                <img class="product-image" src="${product.image}" alt="${product.name}">
            </div>
            <div class="details">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

/* =========================================================
   AUTH MODAL - přihlášení / registrace / potvrzení
   ========================================================= */
(function initAuthModal() {
    const openFormBtn = document.getElementById('open-form-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const backToHomeBtn = document.getElementById('back-to-home-btn');

    const userProfileBox = document.getElementById('user-profile');
    const userNameDisplay = document.getElementById('user-name-display');
    const logoutBtn = document.getElementById('logout-btn');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (!authModal) return;

    /* =====================================================
       "Databáze" uživatelů (demo bez backendu)
       Uchovává VŠECHNY registrované uživatele podle e-mailu,
       aby se jméno/příjmení dalo dohledat i při loginu,
       ne jen hned po registraci.
       ===================================================== */
    function getUsersDb() {
        return JSON.parse(localStorage.getItem('usersDb') || '{}');
    }

    function saveUserToDb(user) {
        const db = getUsersDb();
        const key = user.email.trim().toLowerCase();
        db[key] = user;
        localStorage.setItem('usersDb', JSON.stringify(db));
    }

    function findUserByEmail(email) {
        const db = getUsersDb();
        return db[email.trim().toLowerCase()] || null;
    }

    /* =====================================================
       Zobrazení přihlášeného uživatele v hlavičce
       (panáček + jméno místo tlačítka "Login")
       ===================================================== */
    function renderAuthHeader() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

        if (isLoggedIn && currentUser) {
            if (openFormBtn) openFormBtn.style.display = 'none';
            if (userProfileBox) userProfileBox.style.display = 'flex';
            if (userNameDisplay) {
                const fullName = `${currentUser.jmeno || ''} ${currentUser.prijmeni || ''}`.trim();
                userNameDisplay.textContent = fullName || currentUser.email;
            }
        } else {
            if (openFormBtn) openFormBtn.style.display = '';
            if (userProfileBox) userProfileBox.style.display = 'none';
        }
    }

    function loginUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        renderAuthHeader();
    }

    function logoutUser() {
        localStorage.removeItem('isLoggedIn');
        renderAuthHeader();
        openModal('logout');
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }

    const backToHomeFromLogoutBtn = document.getElementById('back-to-home-from-logout-btn');
    if (backToHomeFromLogoutBtn) {
        backToHomeFromLogoutBtn.addEventListener('click', () => {
            closeModal();
            setAuthState('login');
        });
    }

    // Vykreslit správný stav hned při načtení stránky
    renderAuthHeader();

    const states = {
        login: authModal.querySelector('.auth-state--login'),
        register: authModal.querySelector('.auth-state--register'),
        success: authModal.querySelector('.auth-state--success'),
        logout: authModal.querySelector('.auth-state--logout')
    };

    function setAuthState(name) {
        Object.values(states).forEach(el => el && el.classList.remove('active'));
        if (states[name]) states[name].classList.add('active');
    }

    function openModal(initialState) {
        authModal.classList.remove('hidden');
        setAuthState(initialState || 'login');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        authModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    function resetForm(form) {
        if (!form) return;
        form.reset();
        form.querySelectorAll('.form-control').forEach(input => input.classList.remove('is-invalid'));
        form.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; });
        const strengthBar = form.querySelector('.password-strength-bar');
        if (strengthBar) {
            strengthBar.classList.remove('level-1', 'level-2', 'level-3');
        }
        form.querySelectorAll('.toggle-password').forEach(btn => {
            const input = btn.parentElement.querySelector('input');
            if (input) input.type = 'password';
            const eyeOpen = btn.querySelector('.eye-open');
            const eyeClosed = btn.querySelector('.eye-closed');
            if (eyeOpen) eyeOpen.hidden = false;
            if (eyeClosed) eyeClosed.hidden = true;
        });
    }

    /* --- Otevření a zavření modálu --- */
    if (openFormBtn) {
        openFormBtn.addEventListener('click', () => openModal('login'));
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    authModal.addEventListener('click', event => {
        if (event.target === authModal) closeModal();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !authModal.classList.contains('hidden')) closeModal();
    });

    /* --- Přepínání login <-> registrace --- */
    if (switchToRegister) {
        switchToRegister.addEventListener('click', () => setAuthState('register'));
    }
    if (switchToLogin) {
        switchToLogin.addEventListener('click', () => setAuthState('login'));
    }

    /* --- Návrat na hlavní stránku (z potvrzovací obrazovky) --- */
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            resetForm(registerForm);
            resetForm(loginForm);
            closeModal();
            setAuthState('login');
        });
    }

/* --- Kontrola přihlášení při startu --- */
const uzivatel = localStorage.getItem("prihlasenyUzivatel");
if (uzivatel) {
    const loginBtn = document.getElementById("loginButtonID");
    const userEmailSpan = document.getElementById("userEmailID");
    if (loginBtn) loginBtn.style.display = "none";
    if (userEmailSpan) userEmailSpan.textContent = uzivatel;
}
const logounBtn = document.getElementById("loginBtn");
if (logounBtn) {
    logounBtn.addEventListener("click", () => {
        localStorage.removeItem("prihlasenyUzivatel");
        location.reload();
    });
}

    /* --- Automatické otevření modálu (např. ?auth=register) --- */
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === 'register') {
        openModal('register');
    } else if (urlParams.get('auth') === 'login') {
        openModal('login');
    }

    /* =====================================================
       Obecná validace pole
       ===================================================== */
    function showFieldError(form, name, message) {
        const errorEl = form.querySelector(`.field-error[data-error-for="${name}"]`);
        const input = form.querySelector(`[name="${name}"]`);
        if (errorEl) errorEl.textContent = message || '';
        if (input) input.classList.toggle('is-invalid', Boolean(message));
    }

    function validateRequired(form, name, value) {
        if (!value) {
            showFieldError(form, name, 'Toto pole je povinné');
            return false;
        }
        showFieldError(form, name, '');
        return true;
    }

    function validateEmail(form, name, value) {
        if (!value) {
            showFieldError(form, name, 'Toto pole je povinné');
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            showFieldError(form, name, 'Zadejte platnou e-mailovou adresu');
            return false;
        }
        showFieldError(form, name, '');
        return true;
    }

    function validatePassword(form, name, value, minLength) {
        if (!value) {
            showFieldError(form, name, 'Toto pole je povinné');
            return false;
        }
        if (minLength && value.length < minLength) {
            showFieldError(form, name, `Heslo musí mít alespoň ${minLength} znaků`);
            return false;
        }
        showFieldError(form, name, '');
        return true;
    }

    /* =====================================================
       Přepínač viditelnosti hesla (ikonka oka) + síla hesla
       Funguje obecně pro libovolné pole .password-field v modálu.
       ===================================================== */
    authModal.querySelectorAll('.password-field').forEach(wrapper => {
        const input = wrapper.querySelector('input');
        const toggleBtn = wrapper.querySelector('.toggle-password');
        if (!input || !toggleBtn) return;

        toggleBtn.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';

            const eyeOpen = toggleBtn.querySelector('.eye-open');
            const eyeClosed = toggleBtn.querySelector('.eye-closed');
            if (eyeOpen) eyeOpen.hidden = isPassword;
            if (eyeClosed) eyeClosed.hidden = !isPassword;
            toggleBtn.setAttribute('aria-label', isPassword ? 'Skrýt heslo' : 'Zobrazit heslo');
        });
    });

    function passwordStrengthScore(value) {
        if (!value) return 0;
        if (value.length < 6) return 1;   // Slabé (červená)
        if (value.length <= 10) return 2; // Střední (oranžová)
        return 3;                         // Silné (zelená), 11 a více znaků
    }

    const registerPasswordInput = registerForm ? registerForm.querySelector('[name="heslo"]') : null;
    const strengthBar = registerForm ? registerForm.querySelector('.password-strength-bar') : null;

    if (registerPasswordInput && strengthBar) {
        registerPasswordInput.addEventListener('input', () => {
            const value = registerPasswordInput.value;
            const score = passwordStrengthScore(value);

            // vždy nejdřív odebrat staré třídy, jinak zůstanou všechny najednou
            strengthBar.classList.remove('level-1', 'level-2', 'level-3');

            if (score > 0) {
                strengthBar.classList.add(`level-${score}`);
            }
        });
    }

    /* =====================================================
       Živé mazání chybové hlášky při opravě pole
       ===================================================== */
    [loginForm, registerForm].forEach(form => {
        if (!form) return;
        form.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) {
                    showFieldError(form, input.name, '');
                }
            });
        });
    });

    /* =====================================================
       Formulář: Přihlášení
       ===================================================== */
    if (loginForm) {
        loginForm.addEventListener('submit', event => {
            event.preventDefault();

            const email = loginForm.querySelector('[name="login_email"]').value.trim();
            const password = loginForm.querySelector('[name="login_password"]').value;

            const emailValid = validateEmail(loginForm, 'login_email', email);
            const passwordValid = validatePassword(loginForm, 'login_password', password);

            if (!emailValid || !passwordValid) return;

            // Demo bez backendu: jméno/příjmení dohledáme podle e-mailu
            // ve "spárované databázi" uživatelů (usersDb), do které se
            // každý účet uloží při registraci. Funguje tak stejně
            // pro jakéhokoliv uživatele, ne jen pro toho posledního.
            const existingUser = findUserByEmail(email);
            let userToLogin;

            if (existingUser) {
                userToLogin = existingUser;
            } else {
                // Uživatel s tímto e-mailem zatím není v naší "databázi"
                // (např. starý účet z doby před touto opravou) - jméno
                // odvodíme z e-mailu jen jako nouzovku a rovnou ho uložíme,
                // aby se příště už dohledávalo normálně.
                userToLogin = { jmeno: email.split('@')[0], prijmeni: '', email };
                saveUserToDb(userToLogin);
            }

            resetForm(loginForm);
            closeModal();
            loginUser(userToLogin);
        });
    }

    /* =====================================================
       Formulář: Registrace
       ===================================================== */
    if (registerForm) {
        registerForm.addEventListener('submit', event => {
            event.preventDefault();

            const jmeno = registerForm.querySelector('[name="jmeno"]').value.trim();
            const prijmeni = registerForm.querySelector('[name="prijmeni"]').value.trim();
            const email = registerForm.querySelector('[name="email"]').value.trim();
            const heslo = registerForm.querySelector('[name="heslo"]').value;

            const jmenoValid = validateRequired(registerForm, 'jmeno', jmeno);
            const prijmeniValid = validateRequired(registerForm, 'prijmeni', prijmeni);
            const emailValid = validateEmail(registerForm, 'email', email);
            const hesloValid = validatePassword(registerForm, 'heslo', heslo, 6);

            if (!jmenoValid || !prijmeniValid || !emailValid || !hesloValid) return;

            // Demo bez backendu: heslo se nikam neposílá ani neukládá.
            // Jméno/příjmení uložíme jednak do trvalé "databáze" uživatelů
            // (usersDb) podle e-mailu - aby se dalo dohledat i při
            // pozdějším loginu - a zároveň nastavíme jako aktuálně
            // přihlášeného uživatele pro zobrazení v hlavičce.
            const newUser = { jmeno, prijmeni, email };
            saveUserToDb(newUser);
            setAuthState('success');
            loginUser(newUser);
        });
    }

    /* =====================================================
       Firebase Authentication - přihlášení přes Google/Facebook
       Napojeno na stejný systém jako klasický login (usersDb,
       loginUser, horní lišta), aby po přihlášení přes sociální
       síť fungovalo úplně stejně jako po klasickém přihlášení.
       ===================================================== */
    const firebaseConfig = {
        apiKey: "AIzaSyA2duXq6jIilGgrZ3lLuQXVWy3-JQf7xww",
        authDomain: "anime-mirror-eshop.firebaseapp.com",
        projectId: "anime-mirror-eshop",
        storageBucket: "anime-mirror-eshop.firebasestorage.app",
        messagingSenderId: "846675900433",
        appId: "1:846675900433:web:c8528a966307964a1c99b0",
        measurementId: "G-5NNTY2BX0B"
    };

    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    function handleSocialLoginSuccess(firebaseUser) {
        // Jméno z Google/Facebooku přijde jako "displayName" (celé jméno
        // dohromady) - rozdělíme ho na jméno/příjmení, ať to sedí se
        // stejnou strukturou uživatele jako u klasické registrace.
        const fullName = (firebaseUser.displayName || '').trim();
        const [jmeno, ...zbytek] = fullName ? fullName.split(' ') : [firebaseUser.email.split('@')[0]];
        const prijmeni = zbytek.join(' ');

        const email = firebaseUser.email;
        const existingUser = findUserByEmail(email);
        const user = existingUser || { jmeno, prijmeni, email };

        saveUserToDb(user);
        closeModal();
        loginUser(user);
    }

    const googleBtn = document.getElementById('google-login-btn');
    const facebookBtn = document.getElementById('facebook-login-btn');

    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            if (typeof firebase === 'undefined') {
                console.error('Firebase SDK se nenačetlo.');
                return;
            }
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => handleSocialLoginSuccess(result.user))
                .catch(error => console.error('Chyba přihlášení přes Google:', error.message));
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => {
            if (typeof firebase === 'undefined') {
                console.error('Firebase SDK se nenačetlo.');
                return;
            }
            const provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => handleSocialLoginSuccess(result.user))
                .catch(error => console.error('Chyba přihlášení přes Facebook:', error.message));
        });
    }
})();