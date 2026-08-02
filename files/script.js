/* =========================================================
   PRODUKTY - vykreslení karet zrcadel
   ========================================================= */
const products = [
    {
        id: 1,
        name: 'Naruto Uzumaki Manga Mirror',
        price: '14.99',
        character: 'Naruto Uzumaki',
        image: 'https://i.pinimg.com/736x/ec/1e/e8/ec1ee8ad642f4a2d07e6aefdc3b113ce.jpg'
    },
    {
        id: 2,
        name: 'Guts Berserk Manga Mirror',
        price: '13.99',
        character: 'Guts',
        image: 'https://images.squarespace-cdn.com/content/v1/5ace4845e17ba35c9d8eb95e/faa77b6e-fd83-4c29-8a67-12915720d339/guts+with+sword.PNG'
    },
    {
        id: 3,
        name: 'Satoru Gojo Jujutsu Kaisen Manga Mirror',
        price: '10.99',
        character: 'Satoru Gojo',
        image: 'https://tse4.mm.bing.net/th/id/OIP.an08NHnldOYl6oXKUrjRuAHaDv?r=0&w=622&h=314&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
        id: 4,
        name: 'Yuji Itadori Jujutsu Kaisen Manga Mirror',
        price: '12.99',
        character: 'Yuji Itadori',
        image: 'https://64.media.tumblr.com/a1e3c3c74831d7cef34f4f483dd81385/71d682f144fa04aa-d7/s1280x1920/a9632934823f54855431af30c5f4632f2bc381ad.jpg'
    },
    {
        id: 5,
        name: 'Maki Zenin Jujutsu Kaisen Manga Mirror',
        price: '12.99',
        character: 'Maki Zenin',
        image: 'https://static.deltiasgaming.com/2024/12/Maki-2-1536x864.jpg'
    },
    {
        id: 6,
        name: 'Itachi Uchiha Manga Mirror',
        price: '11.99',
        character: 'Itachu Uchiha',
        image: 'https://i.pinimg.com/736x/83/dd/4f/83dd4f172fd158fcded04ef396057080.jpg'
    },
    {
        id: 7,
        name: 'Kaori Itami Jujutsu Kaisen Manga Mirror',
        price: '10.99',
        character: 'Kaori Itami',
        image: 'https://gamek.mediacdn.vn/133514250583805952/2024/9/30/jujutsu-kaisen-questions-yuji-1727683340418372725624-1727685393571-17276853936931927567325.jpg'
    },
    {
        id: 8,
        name: 'Light Yagami Death Note Manga Mirror',
        price: '14.99',
        character: 'Light Yagami',
        image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/03/Light-as-he-appears-in-the-Death-Note-Manga.jpg'
    },
    {
        id: 9,
        name: 'L Lawliet Death Note Manga Mirror',
        price: '10.99',
        character: 'L Lawliet',
        image: 'https://preview.redd.it/xnes3uqksi651.jpg?auto=webp&s=c159db6968fca2935308d821bb6b151015bbf874'
    },
    {
        id: 10,
        name: 'Kakashi Hatake Naruto Manga Mirror',
        price: '11.99',
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

    // Bez skutečného odeslání formuláře na server (tady je vše jen v
    // localStorage) prohlížeč sám neví, že proběhlo přihlášení/registrace,
    // a proto nenabídne uložení hesla. Credential Management API mu to
    // řekne explicitně - díky tomu se zobrazí nativní bublina "Uložit heslo?"
    // vpravo nahoře.
    function offerToSavePassword(email, password) {
        if (!window.PasswordCredential || !navigator.credentials) return;
        try {
            const cred = new PasswordCredential({ id: email, password, name: email });
            navigator.credentials.store(cred).catch(() => {});
        } catch (e) {
            console.error('Nepodařilo se nabídnout uložení hesla:', e);
        }
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
    const loginBtn = document.getElementById("open-form-btn");
    const userEmailSpan = document.getElementById("user-profile");
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

/* --- Vymazání políček při odhlášení --- */
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-heslo");
if (emailInput) emailInput.value = "";
if (passwordInput) passwordInput.value = "";

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

            if (typeof firebase === 'undefined') {
                console.error('Firebase SDK se nenačetlo (zkontroluj <script> tagy v index.html).');
                return;
            }

            const submitBtn = loginForm.querySelector('.submit-button');
            if (submitBtn) submitBtn.disabled = true;

            // Skutečné ověření hesla přes Firebase Authentication - heslo se
            // porovnává na Firebase serverech, ne jen u nás v localStorage.
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    // Jméno/příjmení dohledáme podle e-mailu ve "spárované
                    // databázi" uživatelů (usersDb); pokud tam ještě není
                    // (např. účet vytvořený jinde), odvodíme ho z Firebase
                    // profilu (displayName) jako nouzovku.
                    const existingUser = findUserByEmail(email);
                    let userToLogin;

                    if (existingUser) {
                        userToLogin = existingUser;
                    } else {
                        const fullName = (userCredential.user.displayName || '').trim();
                        const [jmeno, ...zbytek] = fullName ? fullName.split(' ') : [email.split('@')[0]];
                        userToLogin = { jmeno, prijmeni: zbytek.join(' '), email };
                        saveUserToDb(userToLogin);
                    }

                    offerToSavePassword(email, password);
                    resetForm(loginForm);
                    closeModal();
                    loginUser(userToLogin);
                })
                .catch(error => {
                    console.error('Chyba při přihlášení:', error);
                    // Záměrně obecná hláška (neprozrazujeme, jestli chyba
                    // byla ve špatném e-mailu, nebo ve špatném heslu).
                    showFieldError(loginForm, 'login_password', 'Nesprávný e-mail nebo heslo');
                })
                .finally(() => {
                    if (submitBtn) submitBtn.disabled = false;
                });
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

            if (typeof firebase === 'undefined') {
                console.error('Firebase SDK se nenačetlo (zkontroluj <script> tagy v index.html).');
                return;
            }

            const submitBtn = registerForm.querySelector('.submit-button');
            if (submitBtn) submitBtn.disabled = true;

            // Skutečné vytvoření účtu přes Firebase Authentication - heslo se
            // bezpečně uloží (hashované) na Firebase serverech, nikdy ne
            // u nás v localStorage.
            firebase.auth().createUserWithEmailAndPassword(email, heslo)
                .then(userCredential => {
                    const fullName = `${jmeno} ${prijmeni}`.trim();
                    return userCredential.user.updateProfile({ displayName: fullName });
                })
                .then(() => {
                    const newUser = { jmeno, prijmeni, email };
                    saveUserToDb(newUser);
                    offerToSavePassword(email, heslo);
                    setAuthState('success');
                    loginUser(newUser);
                })
                .catch(error => {
                    console.error('Chyba při registraci:', error);
                    if (error.code === 'auth/email-already-in-use') {
                        showFieldError(registerForm, 'email', 'Tento e-mail je již zaregistrovaný');
                    } else if (error.code === 'auth/weak-password') {
                        showFieldError(registerForm, 'heslo', 'Heslo je příliš slabé');
                    } else if (error.code === 'auth/invalid-email') {
                        showFieldError(registerForm, 'email', 'Neplatná e-mailová adresa');
                    } else if (error.code === 'auth/operation-not-allowed') {
                        showFieldError(registerForm, 'heslo', 'Registrace e-mailem/heslem není ve Firebase zapnutá');
                    } else {
                        showFieldError(registerForm, 'heslo', 'Registraci se nepodařilo dokončit, zkuste to prosím znovu');
                    }
                })
                .finally(() => {
                    if (submitBtn) submitBtn.disabled = false;
                });
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

    // Po přesměrování zpět z Google/Facebooku (pokud by se v budoucnu
    // použila metoda signInWithRedirect) Firebase vrátí výsledek přes
    // getRedirectResult() - necháváme i pro jistotu, neškodí to.
    if (typeof firebase !== 'undefined') {
        firebase.auth().getRedirectResult()
            .then(result => {
                if (result && result.user) {
                    handleSocialLoginSuccess(result.user);
                }
            })
            .catch(error => console.error('Chyba po návratu z přihlášení:', error));
    }

    // Tlačítka jsou jak v přihlašovacím, tak v registračním stavu modálu -
    // vybíráme je všechna (querySelectorAll), aby se stejná logika napojila
    // na obě dvojice tlačítek.
    const googleBtns = document.querySelectorAll('#google-login-btn, #google-register-btn');
    const facebookBtns = document.querySelectorAll('#facebook-login-btn, #facebook-register-btn');

    googleBtns.forEach(googleBtn => {
        googleBtn.addEventListener('click', async (e) => {
            // preventDefault - kdyby tlačítko bylo někdy uvnitř formuláře,
            // nesmí dojít k odeslání formuláře / obnovení stránky.
            e.preventDefault();

            if (typeof firebase === 'undefined') {
                console.error('Firebase SDK se nenačetlo (zkontroluj <script> tagy v index.html).');
                return;
            }

            try {
                const provider = new firebase.auth.GoogleAuthProvider();
                const result = await firebase.auth().signInWithPopup(provider);
                handleSocialLoginSuccess(result.user);
            } catch (error) {
                // Vypisujeme celý error objekt (ne jen .message), aby byl
                // v konzoli vidět i error.code (např. auth/operation-not-allowed,
                // auth/unauthorized-domain, auth/popup-blocked apod.)
                console.error('Chyba při přihlášení přes Google:', error);
            }
        });
    });

    facebookBtns.forEach(facebookBtn => {
        facebookBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            if (typeof firebase === 'undefined') {
                console.error('Firebase SDK se nenačetlo (zkontroluj <script> tagy v index.html).');
                return;
            }

            try {
                const provider = new firebase.auth.FacebookAuthProvider();
                const result = await firebase.auth().signInWithPopup(provider);
                handleSocialLoginSuccess(result.user);
                localStorage.setItem("prihlasenyUzivatel",result.user.email);
            } catch (error) {
                console.error('Chyba při přihlášení přes Facebook:', error);
            }
        });
    });
})();

/* =========================================================
   KOŠÍK
   ========================================================= */
(function initCart() {
    const openCartBtn = document.getElementById('open-cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeCartModalBtn = document.getElementById('close-cart-modal');
    const cartBadge = document.getElementById('cart-badge');
    const cartItemsBox = document.getElementById('cart-items');
    const cartEmptyMsg = document.getElementById('cart-empty');
    const cartSummaryBox = document.getElementById('cart-summary');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    const productContainer = document.getElementById('product-container');

    if (!cartModal) return;

    // Košík uchováváme jako { productId: mnozstvi } v localStorage - stejný
    // princip demo-uložiště jako u uživatelů (usersDb).
    function getCart() {
        return JSON.parse(localStorage.getItem('cart') || '{}');
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function findProduct(id) {
        return products.find(p => String(p.id) === String(id));
    }

    function addToCart(id) {
        const cart = getCart();
        cart[id] = (cart[id] || 0) + 1;
        saveCart(cart);
        renderCart();
    }

    function changeQty(id, delta) {
        const cart = getCart();
        if (!cart[id]) return;
        cart[id] += delta;
        if (cart[id] <= 0) {
            delete cart[id];
        }
        saveCart(cart);
        renderCart();
    }

    function removeFromCart(id) {
        const cart = getCart();
        delete cart[id];
        saveCart(cart);
        renderCart();
    }

    function getCartCount(cart) {
        return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    }

    function getCartTotal(cart) {
        return Object.entries(cart).reduce((sum, [id, qty]) => {
            const product = findProduct(id);
            return product ? sum + parseFloat(product.price) * qty : sum;
        }, 0);
    }

    function updateBadge() {
        const cart = getCart();
        const count = getCartCount(cart);
        if (cartBadge) {
            cartBadge.textContent = count;
            cartBadge.classList.toggle('hidden', count === 0);
        }
    }

    function renderCart() {
        const cart = getCart();
        const entries = Object.entries(cart);

        updateBadge();

        if (!cartItemsBox) return;

        if (entries.length === 0) {
            cartItemsBox.innerHTML = '';
            if (cartEmptyMsg) cartEmptyMsg.classList.remove('hidden');
            if (cartSummaryBox) cartSummaryBox.classList.add('hidden');
            return;
        }

        if (cartEmptyMsg) cartEmptyMsg.classList.add('hidden');
        if (cartSummaryBox) cartSummaryBox.classList.remove('hidden');

        cartItemsBox.innerHTML = entries.map(([id, qty]) => {
            const product = findProduct(id);
            if (!product) return '';
            return `
                <div class="cart-item" data-id="${product.id}">
                    <img class="cart-item-image" src="${product.image}" alt="${product.name}">
                    <div class="cart-item-info">
                        <h4>${product.name}</h4>
                        <p>$${product.price}</p>
                    </div>
                    <div class="cart-item-qty">
                        <button type="button" class="qty-btn qty-decrease" data-id="${product.id}" aria-label="Ubrat kus">-</button>
                        <span class="qty-value">${qty}</span>
                        <button type="button" class="qty-btn qty-increase" data-id="${product.id}" aria-label="Přidat kus">+</button>
                    </div>
                    <button type="button" class="cart-item-remove" data-id="${product.id}" aria-label="Odebrat z košíku">&times;</button>
                </div>
            `;
        }).join('');

        if (cartTotalEl) {
            cartTotalEl.textContent = `$${getCartTotal(cart).toFixed(2)}`;
        }
    }

    function openCartModal() {
        renderCart();
        cartModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeCartModal() {
        cartModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (openCartBtn) {
        openCartBtn.addEventListener('click', openCartModal);
    }

    if (closeCartModalBtn) {
        closeCartModalBtn.addEventListener('click', closeCartModal);
    }

    cartModal.addEventListener('click', event => {
        if (event.target === cartModal) closeCartModal();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !cartModal.classList.contains('hidden')) closeCartModal();
    });

    // Kroky v modálu košíku - obdoba auth-state u přihlašovacího modálu.
    const cartSteps = {
        items: cartModal.querySelector('.cart-step--items'),
        checkout: cartModal.querySelector('.cart-step--checkout'),
        confirmation: cartModal.querySelector('.cart-step--confirmation')
    };

    function setCartStep(name) {
        Object.values(cartSteps).forEach(el => el && el.classList.remove('active'));
        if (cartSteps[name]) cartSteps[name].classList.add('active');
    }

    const checkoutForm = document.getElementById('checkout-form');
    const checkoutBackBtn = document.getElementById('checkout-back-btn');
    const checkoutTotalEl = document.getElementById('checkout-total');
    const orderNumberEl = document.getElementById('order-number');
    const closeConfirmationBtn = document.getElementById('cart-close-confirmation-btn');

    function showCheckoutFieldError(name, message) {
        const errorEl = checkoutForm.querySelector(`.field-error[data-error-for="${name}"]`);
        const input = checkoutForm.querySelector(`[name="${name}"]`);
        if (errorEl) errorEl.textContent = message || '';
        if (input) input.classList.toggle('is-invalid', Boolean(message));
    }

    // Přidání do košíku - delegace na kontejner produktů, funguje i pro
    // karty vykreslené dynamicky (viz začátek souboru).
    if (productContainer) {
        productContainer.addEventListener('click', event => {
            const btn = event.target.closest('.add-to-cart-btn');
            if (!btn) return;
            addToCart(btn.dataset.id);

            const originalText = btn.textContent;
            btn.textContent = 'Přidáno ✓';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 900);
        });
    }

    // Ovládání množství a odebrání - delegace na seznam položek košíku.
    if (cartItemsBox) {
        cartItemsBox.addEventListener('click', event => {
            const decreaseBtn = event.target.closest('.qty-decrease');
            const increaseBtn = event.target.closest('.qty-increase');
            const removeBtn = event.target.closest('.cart-item-remove');

            if (decreaseBtn) changeQty(decreaseBtn.dataset.id, -1);
            if (increaseBtn) changeQty(increaseBtn.dataset.id, 1);
            if (removeBtn) removeFromCart(removeBtn.dataset.id);
        });
    }

    // Krok 1 -> 2: z obsahu košíku na platební formulář.
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (checkoutTotalEl) {
                checkoutTotalEl.textContent = cartTotalEl ? cartTotalEl.textContent : '$0.00';
            }
            setCartStep('checkout');
        });
    }

    // Krok 2 -> 1: návrat zpět do košíku bez ztráty obsahu.
    if (checkoutBackBtn) {
        checkoutBackBtn.addEventListener('click', () => setCartStep('items'));
    }

    // Krok 2 -> 3: "zaplacení" (demo - žádná skutečná platba, žádné údaje
    // se nikam neposílají) a vygenerování čísla objednávky.
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', event => {
            event.preventDefault();

            const firstname = checkoutForm.querySelector('[name="checkout_firstname"]').value.trim();
            const lastname = checkoutForm.querySelector('[name="checkout_lastname"]').value.trim();
            const address = checkoutForm.querySelector('[name="checkout_address"]').value.trim();
            const apartment = checkoutForm.querySelector('[name="checkout_apartment"]').value.trim();
            const zip = checkoutForm.querySelector('[name="checkout_zip"]').value.trim();
            const card = checkoutForm.querySelector('[name="checkout_card"]').value.replace(/\s/g, '');
            const expiry = checkoutForm.querySelector('[name="checkout_expiry"]').value.trim();
            const cvc = checkoutForm.querySelector('[name="checkout_cvc"]').value.trim();

            let valid = true;

            if (!firstname) { showCheckoutFieldError('checkout_firstname', 'Toto pole je povinné'); valid = false; }
            else showCheckoutFieldError('checkout_firstname', '');

            if (!lastname) { showCheckoutFieldError('checkout_lastname', 'Toto pole je povinné'); valid = false; }
            else showCheckoutFieldError('checkout_lastname', '');

            if (!address) { showCheckoutFieldError('checkout_address', 'Toto pole je povinné'); valid = false; }
            else showCheckoutFieldError('checkout_address', '');

            if (!apartment) { showCheckoutFieldError('checkout_apartment', 'Toto pole je povinné'); valid = false; }
            else showCheckoutFieldError('checkout_apartment', '');

            if (!/^\d{3}\s?\d{2}$/.test(zip)) { showCheckoutFieldError('checkout_zip', 'Zadejte platné PSČ'); valid = false; }
            else showCheckoutFieldError('checkout_zip', '');

            if (!/^\d{16}$/.test(card)) { showCheckoutFieldError('checkout_card', 'Zadejte platné 16-místné číslo karty'); valid = false; }
            else showCheckoutFieldError('checkout_card', '');

            if (!/^\d{2}\/\d{2}$/.test(expiry)) { showCheckoutFieldError('checkout_expiry', 'Formát MM/RR'); valid = false; }
            else showCheckoutFieldError('checkout_expiry', '');

            if (!/^\d{3,4}$/.test(cvc)) { showCheckoutFieldError('checkout_cvc', 'Neplatné CVC'); valid = false; }
            else showCheckoutFieldError('checkout_cvc', '');

            if (!valid) return;

            const orderNumber = `#${Math.floor(100000 + Math.random() * 900000)}`;
            if (orderNumberEl) orderNumberEl.textContent = orderNumber;

            saveCart({});
            renderCart();
            checkoutForm.reset();
            setCartStep('confirmation');
        });
    }

    // Krok 3: zavření celého modálu, příště se otevře zase od košíku.
    if (closeConfirmationBtn) {
        closeConfirmationBtn.addEventListener('click', () => {
            closeCartModal();
            setCartStep('items');
        });
    }

    updateBadge();
})();