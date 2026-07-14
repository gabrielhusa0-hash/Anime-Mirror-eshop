/* Zakladní nastavení celé stránky */
body {
    background-color: #0f0f12; /* Tmavě šedá barva */
    color: white; /* Bílá barva textu */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    margin: 0;
    padding: 0;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(260px, 1fr));
    gap: 24px;
    padding: 20px;
}

.product-card {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 18px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
    transition: transform 0.25s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.product-card:hover {
    transform: translateY(-4px);
}

.image-wrap {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #010104;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.4s ease;
}

.product-card:hover .product-image {
    transform: scale(1.02);
}

.details {
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    justify-content: space-between;
}

.product-card h3,
.product-card p,
.product-card button {
    margin: 0;
}

.product-card button {
    background: #1c1a33;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 12px 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
}

.product-card button:hover {
    background: #3f3b6c;
    transform: translateY(-1px);
}

.hero {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(360px, 1.15fr);
    align-items: center;
    gap: 28px;
    padding: 18px 24px 32px;
    background: #0f0f12;
    color: white;
}

.top-bar {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 12px;
}

.main-nav {
    display: flex;
    gap: 28px;
    align-items: center;
    margin-left: 12px;
}

.main-nav a {
    color: #eaeaea;
    text-decoration: none;
    padding: 8px 10px;
    border-radius: 8px;
    font-weight: 600;
    opacity: 0.95;
}

.main-nav a:hover {
    background: rgba(255,255,255,0.03);
}

.search-form {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 20px;
}

.left-group {
    display: flex;
    align-items: center;
    gap: 40px;
}

.search-input {
    background: rgba(255,255,255,0.06);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.06);
    padding: 12px 18px;
    border-radius: 999px;
    width: clamp(260px, 46vw, 740px);
    outline: none;
    transition: background 220ms ease, color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
}

.search-input::placeholder { color: rgba(255,255,255,0.6); }

.search-button {
    background: transparent;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    cursor: pointer;
}

.search-button svg path { stroke: #fff; }

/* Hover "bubble" highlight for top-bar controls */
.search-form:hover .search-input,
.search-input:focus {
    background: #ffffff;
    color: #0f0f12;
    box-shadow: 0 18px 40px rgba(255,255,255,0.12);
}

.main-nav a {
    color: #eaeaea;
    text-decoration: none;
    padding: 10px 14px;
    border-radius: 999px;
    font-weight: 600;
    opacity: 0.95;
    transition: background 200ms ease, color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
}

.main-nav a:hover {
    background: #ffffff;
    color: #0f0f12;
    box-shadow: 0 12px 30px rgba(255,255,255,0.12);
    transform: translateY(-2px);
}

.nav-button {
    background: rgba(255, 255, 255, 0.08);
    color: #e6e6e6;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    padding: 10px 18px;
    cursor: pointer;
    transition: background 200ms ease, color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
}

.nav-button:hover {
    background: #ffffff;
    color: #0f0f12;
    box-shadow: 0 12px 30px rgba(255,255,255,0.12);
    transform: translateY(-2px);
}

.logo {
    font-size: 1.35rem;
    font-weight: 800;
    letter-spacing: 0.05em;
}


.hero-image {
    width: 100%;
    max-width: 900px;
    min-width: 340px;
    justify-self: end;
    display: block;
    border-radius: 22px;
    cursor: pointer;
    transition: transform 0.55s ease, box-shadow 0.55s ease, filter 0.55s ease;
    transform-origin: center;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
}

.hero-media {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0;
    width: 100%;
}

.hero-image:hover {
    transform: scale(1.05) rotateY(8deg);
    box-shadow: 0 22px 45px rgba(0, 0, 0, 0.3);
    filter: saturate(1.12) contrast(1.06);
}

.hero-content {
    max-width: 620px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: -6px;
}

.hero-description {
    margin: 0;
    font-size: 1.12rem;
    line-height: 1.7;
    color: #e8e8f0;
    max-width: 560px;
}

.stats-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 18px;
    margin-top: 24px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-right: 18px;
    border-right: 1px solid rgba(255, 255, 255, 0.14);
}

.stat-item:last-of-type {
    border-right: none;
    padding-right: 0;
}

.stat-item h3 {
    margin: 0;
    font-size: 2rem;
    line-height: 1;
}

.stat-item p {
    margin: 0;
    color: #c7c7d5;
    font-size: 0.95rem;
}

.explore-btn {
    border: none;
    background: #7967ff;
    color: white;
    padding: 12px 20px;
    border-radius: 999px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
}

.explore-btn:hover {
    transform: translateY(-1px);
    background: #5f4ee2;
}

.cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    padding: 14px 26px;
    background: #7967ff;
    color: white;
    border: none;
    border-radius: 999px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
    background: #5f4ee2;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    display: grid;
    place-items: center;
    padding: 20px;
    z-index: 100;
}

.hidden {
    display: none;
}

.modal {
    width: min(640px, 96%);
    max-width: 720px;
    border-radius: 22px;
    background: rgba(28, 28, 34, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
    padding: 28px 30px;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 18px;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.4rem;
}

.modal-header p {
    margin: 8px 0 0;
    color: #d0d0f0;
    font-size: 0.95rem;
}

.close-modal {
    background: transparent;
    border: 0;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
    line-height: 1;
}

.form-grid {
    display: grid;
    gap: 14px;
}

.form-group {
    display: grid;
    gap: 8px;
    color: #dcdcff;
    font-size: 0.95rem;
}

.form-control {
    width: 100%;
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.06);
    color: #eaeaf0;
    outline: none;
    transition: background 220ms ease, color 220ms ease, box-shadow 220ms ease, transform 150ms ease;
}

.form-control::placeholder {
    color: #6a6b78;
}

.form-control:focus {
    border-color: #7967ff;
    background: #ffffff; /* white bubble */
    color: #0f0f12; /* black text when typing */
    box-shadow: 0 12px 40px rgba(121, 103, 255, 0.14);
}

.form-control::placeholder { color: #9b9ba6; }

/* Auth modal states */
.auth-state { display: none; }
.auth-state.active { display: block; }
.auth-state .remember {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #dcdcff;
    font-size: 0.95rem;
}
.auth-state .remember input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #7967ff;
}

.modal.register-mode .auth-state--login { display: none; }
.modal.register-mode .auth-state--register { display: block; }

/* make the submit button look like a white pill and keep hover subtle */
.submit-button {
    background: #ffffff;
    color: #0f0f12;
    font-weight: 700;
}

.submit-button:hover {
    background: #e8e8eb;
}

.form-actions {
    margin-top: 18px;
}

.submit-button {
    width: 100%;
    padding: 14px 18px;
    border-radius: 14px;
    border: none;
    background: #f2f2f5;
    color: #111118;
    font-size: 1rem;
    cursor: pointer;
}

.submit-button:hover {
    background: #e8e8eb;
}

.register-note {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    gap: 8px;
    color: #d1d1db;
    font-size: 0.95rem;
}

.link-button {
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-weight: 700;
}

.link-button:hover {
    text-decoration: underline;
}

.submit-button:hover {
    background: #5f4ee2;
}

.product-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

@media (max-width: 900px) {
    .hero {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .hero-image {
        max-width: 90%;
        margin: 0 auto;
    }

    .top-bar {
        justify-content: space-between;
    }
}

@media (max-width: 600px) {
    .hero {
        padding: 40px 16px;
    }

    .cta-button {
        width: 100%;
    }
    
    .hero {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 60px 20px;
    }

   .hero-content {
        max-width: 50%;
    }

    .hero-image {
        max-width: 40%;
        border-radius: 10px;
    }

    .stats-container {
        display: flex;
        gap: 30px;
        margin: 20px 0;
    }
}

.quote-section {
    width: 100%;
    margin: 56px 0 0;
    padding: 0;
    background: #0f0f0f;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
}

.quote-content {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 0;
    width: 100%;
    max-width: 100%;
    margin: 0;
    background: #0f0f0f;
}

.quote-image-wrapper {
    flex: 0 0 55%;
    min-height: 480px;
    overflow: hidden;
    background: #060606;
}

.quote-image-wrapper img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 480px;
    object-fit: cover;
    object-position: center;
    transition: transform 0.55s ease;
}

.quote-image-wrapper:hover img {
    transform: scale(1.05);
}

.quote-text {
    flex: 1 1 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 48px 40px;
    color: #ffffff;
    background: linear-gradient(135deg, #111111 0%, #0f0f0f 100%);
}

.quote-text h2 {
    margin: 0 0 12px;
    color: #8b8dff;
    font-size: 2rem;
}

.quote-text h3 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 1.6;
    color: #ececf7;
}