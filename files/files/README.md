# GH-ANIME-GLASS (Anime Mirror Eshop)

E-shop s anime zrcadly - vlastní projekt na procvičení frontendu a základů autentizace.

Zatím je hotový **pouze frontend** (HTML, CSS, vanilla JavaScript). Backend a databáze jsou v plánu.

## 🔗 Live demo

delicate-kitsune-3a77af.netlify.app

## Co web umí

- **Přihlášení a registrace přes Google** (Firebase Authentication)
- **Košík** – přidání produktu, úprava množství, odebrání, vše se pamatuje v `localStorage`
- **Checkout flow ve 3 krocích:**
  1. Obsah košíku s celkovou cenou
  2. Doručovací údaje (jméno, příjmení, adresa, číslo bytu, PSČ) a platba (číslo karty, platnost, CVC)
  3. Potvrzení objednávky s vygenerovaným číslem objednávky
- Validace formulářů (e-mail, síla hesla, formát karty, PSČ, MM/RR)
- Zobrazení jména přihlášeného uživatele v navigaci

## Použité technologie

- HTML5, CSS3, vanilla JavaScript (bez frameworku – schválně, abych si pořádně osahal základy)
- Firebase Authentication (compat SDK) – Google login/registrace
- `localStorage` – košík a session přihlášeného uživatele

## Jak si to spustit lokálně

Firebase Auth (přihlašovací popup) nefunguje při otevření souboru přímo v prohlížeči (`file://`) – je potřeba lokální server. Nejjednodušší cesta:

```bash
# Python (pokud ho máš nainstalovaný)
python -m http.server 5500

# nebo přes VS Code rozšíření "Live Server"
```

Pak otevři `http://localhost:5500` v prohlížeči.

## Co plánuju dál

- Backend (Node.js + Express) a databáze (SQLite) pro reálné ukládání objednávek
- Dokončit přihlášení přes Facebook
- Napojení skutečné platební brány (např. Stripe test mode)
- Responzivní úpravy pro mobil

## Screenshoty

*(sem časem přidám pár screenshotů webu)*

---

Autor: Gabriel Husa – učím se programovat a snažím se dostat do IT. Za jakoukoliv zpětnou vazbu budu rád.