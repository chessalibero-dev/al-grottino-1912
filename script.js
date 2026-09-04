/* ============================================================
   Al Grottino Dal 1912 — script.js (v2, layout più energico)
   Stessa logica funzionale della v1: menu dinamico, toggle IT/EN,
   form prenotazione, mappa, giorno corrente, transizioni.
   In più: bottone "Prenota" flottante che compare scorrendo.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Dati locale ---------- */
  const PHONE_DISPLAY = "06 8079807";
  const PHONE_TEL = "+39068079807";
  const ADDRESS = "Viale Romania 27, 00197 Roma";
  const MAPS_QUERY = encodeURIComponent("Al Grottino Dal 1912, Viale Romania 27, 00197 Roma");
  const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

  /* ---------- Menu ---------- */
  const MENU = [
    {
      id: "antipasti",
      it: "Antipasti", en: "Starters",
      items: [
        { it: "Olive condite e pecorino romano", en: "Marinated olives and pecorino romano", itDesc: "pane e companatico", enDesc: "bread and accompaniments", price: "4,50" },
        { it: "Salumi come si deve", en: "Salumi, the right way", itDesc: "cestino di salumi locali, salsicce e coppiette", enDesc: "basket of local cured meats, sausages and coppiette", price: "14,50" },
        { it: "Coccetto di patate", en: "Potato \"coccetto\"", itDesc: "funghi, brie e pancetta croccante", enDesc: "mushrooms, brie and crispy pancetta", price: "9,50" },
        { it: "Bufala e crudo", en: "Buffalo mozzarella and prosciutto crudo", itDesc: "prosciutto di Norcia e bufala \"Costanzo\"", enDesc: "Norcia prosciutto and \"Costanzo\" buffalo mozzarella", price: "12,00" },
        { it: "Bufala e alici", en: "Buffalo mozzarella and anchovies", itDesc: "", enDesc: "", price: "10,00" },
        { it: "Costoletta di vitello fatta come una volta", en: "Veal cutlet, the old way", itDesc: "latte e fondo bianco", enDesc: "milk and white stock", price: "9,00" },
        { it: "Ricotta, miele e noci", en: "Ricotta, honey and walnuts", itDesc: "fine pasto anticipato", enDesc: "an early taste of dessert", price: "8,50" },
        { it: "Polpette di bollito", en: "Boiled-meat polpette", itDesc: "agli agrumi, con maionese e salsa verde", enDesc: "with citrus, mayonnaise and salsa verde", price: "10,00" },
        { it: "Panzanella come viene a noi", en: "Our panzanella", itDesc: "pomodori, uva bianca, cetrioli e cipolla marinata", enDesc: "tomatoes, white grapes, cucumber and marinated onion", price: "8,00" },
        { it: "Baccalà mantecato", en: "Creamed salt cod", itDesc: "su polenta fritta e pere marinate", enDesc: "on fried polenta with marinated pears", price: "12,00" },
        { it: "Tartare fatta a modo suo", en: "Tartare, made its own way", itDesc: "mango, parmigiano e tartufo nero", enDesc: "mango, parmesan and black truffle", price: "16,00" },
        { it: "Frittelle dell'osteria", en: "House-style fritters", itDesc: "con tre salse: aioli e pepe, pomodoro, formaggio spezzato", enDesc: "with three sauces: aioli and pepper, tomato, broken cheese", price: "8,00" }
      ]
    },
    {
      id: "pastasciutta",
      it: "Pastasciutta", en: "Pasta",
      items: [
        { it: "I primi della tradizione", en: "The traditional classics", itDesc: "Carbonara, Amatriciana, Gricia", enDesc: "Carbonara, Amatriciana, Gricia", price: "14,00" },
        { it: "Ravioli ricotta e spinaci", en: "Ricotta and spinach ravioli", itDesc: "pomodorino fresco e basilico", enDesc: "fresh cherry tomato and basil", price: "13,00" },
        { it: "\"La figatella\"", en: "\"La figatella\"", itDesc: "fichi, pecorino e guanciale", enDesc: "figs, pecorino and guanciale", price: "15,00" },
        { it: "Tortellini alla norcina (senza paura)", en: "Tortellini alla norcina (fear not)", itDesc: "", enDesc: "", price: "14,00" },
        { it: "Strangozzi un po' diversi", en: "Strangozzi, a little different", itDesc: "burro, alici, finocchietto, bergamotto e pepe croccante", enDesc: "butter, anchovies, wild fennel, bergamot and crushed pepper", price: "14,00" }
      ]
    },
    {
      id: "minestre",
      it: "Minestre", en: "Soups",
      note: { it: "…aspettiamo il fresco…", en: "…waiting for cooler weather…" },
      items: []
    },
    {
      id: "secondi",
      it: "Secondi – Piatti seri", en: "Mains – Serious dishes",
      items: [
        { it: "Saltimbocca alla romana", en: "Saltimbocca alla romana", itDesc: "", enDesc: "", price: "15,00" },
        { it: "Polpette alle tre carni al sugo", en: "Three-meat polpette in tomato sauce", itDesc: "", enDesc: "", price: "14,00" },
        { it: "Polpette in bianco", en: "Polpette in bianco", itDesc: "", enDesc: "", price: "14,00" },
        { it: "Guancia brasata", en: "Braised beef cheek", itDesc: "con purè", enDesc: "with mashed potatoes", price: "18,00" },
        { it: "Costine cotte piano piano", en: "Slow-cooked ribs", itDesc: "", enDesc: "", price: "14,00" },
        { it: "Galletto come si deve", en: "Galletto, the right way", itDesc: "patate, maionese e mostarda", enDesc: "potatoes, mayonnaise and mustard fruits", price: "22,00" },
        { it: "Vitello tonnato fatto a modo nostro", en: "Vitello tonnato, our way", itDesc: "", enDesc: "", price: "15,00" }
      ]
    },
    {
      id: "contorni",
      it: "Contorni", en: "Sides",
      items: [
        { it: "Cicoria ripassata", en: "Sautéed chicory", itDesc: "", enDesc: "", price: "6,00" },
        { it: "Broccoletti ripassati", en: "Sautéed broccoletti", itDesc: "", enDesc: "", price: "6,00" },
        { it: "Fagioli all'uccelletto", en: "Beans \"all'uccelletto\"", itDesc: "", enDesc: "", price: "6,00" },
        { it: "Patate al forno", en: "Roast potatoes", itDesc: "", enDesc: "", price: "6,00" }
      ]
    },
    {
      id: "dolci",
      it: "Dolci", en: "Desserts",
      items: [
        { it: "Zabaione al marsala con tozzetti", en: "Marsala zabaione with tozzetti", itDesc: "", enDesc: "", price: "7,00" },
        { it: "Ciambelline e vinsanto", en: "Ciambelline and vin santo", itDesc: "", enDesc: "", price: "7,00" },
        { it: "Crostata ricotta e visciole", en: "Ricotta and sour cherry crostata", itDesc: "", enDesc: "", price: "8,00" },
        { it: "Tiramisù", en: "Tiramisù", itDesc: "", enDesc: "", price: "6,00" },
        { it: "Tartufo affogato al caffè", en: "Chocolate truffle affogato, coffee", itDesc: "anche al Baileys (7,50) o al whisky (8,00)", enDesc: "also with Baileys (7,50) or whisky (8,00)", price: "7,00" }
      ]
    }
  ];

  /* ---------- Orari ---------- */
  const HOURS = [
    { it: "Lunedì", en: "Monday", open: true },
    { it: "Martedì", en: "Tuesday", open: true },
    { it: "Mercoledì", en: "Wednesday", open: true },
    { it: "Giovedì", en: "Thursday", open: true },
    { it: "Venerdì", en: "Friday", open: true },
    { it: "Sabato", en: "Saturday", open: true },
    { it: "Domenica", en: "Sunday", open: false }
  ];
  const HOURS_RANGE = { it: "12:30 – 15:00 / 19:30 – 23:00", en: "12:30 – 3:00 pm / 7:30 – 11:00 pm" };
  const CLOSED_LABEL = { it: "Chiuso", en: "Closed" };

  /* ---------- Traduzioni testi statici ---------- */
  const I18N = {
    "nav.menu": { it: "Menu", en: "Menu" },
    "nav.dove": { it: "Dove siamo", en: "Find us" },
    "nav.storia": { it: "La storia", en: "Our story" },
    "nav.prenota.btn": { it: "Prenota un tavolo", en: "Book a table" },
    "hero.kicker": { it: "Trattoria tradizionale italiana · dal 1912", en: "Traditional Italian trattoria · since 1912" },
    "hero.subtitle": { it: "Ai Parioli, Roma. Terza gestione, stessa sostanza.", en: "In Parioli, Rome. Third management, same substance." },
    "hero.cta.menu": { it: "Guarda il menu", en: "View the menu" },
    "hero.cta.book": { it: "Prenota un tavolo", en: "Book a table" },
    "info.orari.label": { it: "Orari", en: "Hours" },
    "info.indirizzo.label": { it: "Indirizzo", en: "Address" },
    "info.telefono.label": { it: "Telefono", en: "Phone" },
    "info.oggi": { it: "Oggi", en: "Today" },
    "menu.title": { it: "Il menu", en: "The menu" },
    "menu.subtitle": { it: "Prezzi in euro. Seleziona una portata per aprirla.", en: "Prices in euro. Select a course to open it." },
    "feature1.kicker": { it: "In cucina", en: "In the kitchen" },
    "feature1.title": { it: "Cucina tradizionale, senza rivisitazioni", en: "Traditional cooking, no reinterpretations" },
    "feature1.text": {
      it: "Niente riletture, niente tendenze: la linea è quella romana di sempre, proposta con rispetto e semplicità. Amatriciana, guancia brasata, polpette come le fa la trattoria — quelle vere.",
      en: "No reinterpretations, no trends: the same Roman line as always, done with respect and simplicity. Amatriciana, braised cheek, polpette the way a real trattoria makes them."
    },
    "feature2.kicker": { it: "In sala", en: "In the dining room" },
    "feature2.title": { it: "Un ambiente che non ha bisogno di posare", en: "A room that doesn't need to perform" },
    "feature2.text": {
      it: "Legno, fotografie di famiglia, una tv accesa senza audio, il vino della casa a quartino. Due sale, circa quaranta coperti, la stessa personalità da tre generazioni.",
      en: "Wood, family photographs, a muted television, house wine by the quartino. Two dining rooms, about forty covers, the same personality across three generations."
    },
    "press.kicker": { it: "Parlano di noi", en: "In the press" },
    "press.quote": {
      it: "«Ai Parioli, quartiere elegante spesso associato a indirizzi alla moda, resiste una trattoria storica attiva dal 1912 […] Nulla di sbagliato, ma per chi cerca ancora quell'atmosfera genuina, Al Grottino dal 1912 è uno di questi.»",
      en: "\"In Parioli, an elegant neighbourhood often associated with fashionable addresses, a historic trattoria active since 1912 still stands […] For anyone still looking for that genuine atmosphere, Al Grottino dal 1912 is one of the few left.\""
    },
    "press.source": { it: "— Luisa Cuomo, Le Strade, 23 aprile 2026", en: "— Luisa Cuomo, Le Strade, 23 April 2026" },
    "gallery.title": { it: "Galleria", en: "Gallery" },
    "prenota.title": { it: "Prenota un tavolo", en: "Book a table" },
    "prenota.subtitle": { it: "Non abbiamo prenotazione online: compila il modulo, ti prepariamo il messaggio da leggere quando chiami.", en: "We don't take online bookings: fill in the form and we'll prepare the message to read when you call." },
    "prenota.nome": { it: "Nome", en: "Name" },
    "prenota.persone": { it: "Persone", en: "Guests" },
    "prenota.data": { it: "Data", en: "Date" },
    "prenota.ora": { it: "Ora", en: "Time" },
    "prenota.telefono": { it: "Il tuo numero", en: "Your number" },
    "prenota.note": { it: "Note (facoltativo)", en: "Notes (optional)" },
    "prenota.submit": { it: "Prepara il messaggio", en: "Prepare the message" },
    "prenota.result.title": { it: "Ecco cosa dire al telefono:", en: "Here's what to say on the phone:" },
    "prenota.copia": { it: "Copia messaggio", en: "Copy message" },
    "prenota.copiato": { it: "Copiato ✓", en: "Copied ✓" },
    "prenota.chiama": { it: "Chiama ora per prenotare", en: "Call now to book" },
    "prenota.hint": { it: "Il bottone non invia nulla da solo: apre la chiamata, il messaggio qui sopra ti serve da traccia mentre parli con noi.", en: "The button doesn't send anything on its own: it opens the call, and the message above is your script while you talk to us." },
    "mappa.title": { it: "Dove siamo", en: "Find us" },
    "mappa.apri": { it: "Apri in Google Maps", en: "Open in Google Maps" },
    "storia.title": { it: "La storia", en: "Our story" },
    "storia.p1": {
      it: "Ai Parioli, quartiere elegante spesso associato a indirizzi alla moda, resiste una trattoria storica attiva dal 1912, oggi alla sua terza gestione. Varcata la soglia il tempo rallenta: ambiente informale e autentico, legno che domina gli spazi, due sale per circa quaranta coperti complessivi.",
      en: "In Parioli, an elegant neighbourhood often associated with fashionable addresses, a historic trattoria active since 1912 still stands — today in its third management. Cross the threshold and time slows down: an informal, genuine atmosphere, wood-dominated rooms, two dining rooms seating about forty in total."
    },
    "storia.p2": {
      it: "Una tv accesa senza audio, una selezione musicale fatta di classici italiani, il vino della casa servito a quartino, mezzo litro o litro: dettagli semplici che raccontano una sincerità difficile da replicare. La cucina segue una linea chiara, senza riletture: quella tradizionale romana, con rispetto e semplicità.",
      en: "A muted television, a soundtrack of Italian classics, house wine served by the quartino, half-litre or litre: simple details that add up to a sincerity that's hard to replicate. The kitchen follows a clear line, with no reinterpretations: traditional Roman cooking, done with respect and simplicity."
    },
    "storia.fonte": { it: "Estratto adattato da un articolo di Luisa Cuomo, Le Strade (23 aprile 2026).", en: "Adapted excerpt from an article by Luisa Cuomo, Le Strade (23 April 2026)." },
    "footer.social": { it: "Seguici", en: "Follow us" },
    "footer.rights": { it: "Tutti i diritti riservati.", en: "All rights reserved." },
    "sticky.book": { it: "Prenota", en: "Book" }
  };

  /* ---------- Stato lingua ---------- */
  let currentLang = "it";

  function applyStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const entry = I18N[key];
      if (entry) el.textContent = entry[currentLang];
    });
    document.documentElement.setAttribute("lang", currentLang);
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
    });
  }

  /* ---------- Render orari ---------- */
  function renderHours() {
    const list = document.getElementById("hours-list");
    if (!list) return;
    list.innerHTML = "";
    const jsDay = new Date().getDay();
    const todayIndex = jsDay === 0 ? 6 : jsDay - 1;

    HOURS.forEach((day, idx) => {
      const row = document.createElement("li");
      row.className = "hours-row" + (idx === todayIndex ? " is-today" : "");
      const name = document.createElement("span");
      name.className = "hours-day";
      name.textContent = day[currentLang];
      if (idx === todayIndex) {
        const badge = document.createElement("span");
        badge.className = "today-badge";
        badge.setAttribute("data-i18n", "info.oggi");
        badge.textContent = I18N["info.oggi"][currentLang];
        name.appendChild(document.createTextNode(" · "));
        name.appendChild(badge);
      }
      const range = document.createElement("span");
      range.className = "hours-range";
      range.textContent = day.open ? HOURS_RANGE[currentLang] : CLOSED_LABEL[currentLang];
      row.appendChild(name);
      row.appendChild(range);
      list.appendChild(row);
    });
  }

  /* ---------- Render menu ---------- */
  function renderMenu() {
    const wrap = document.getElementById("menu-accordion");
    if (!wrap) return;
    wrap.innerHTML = "";

    MENU.forEach((cat, i) => {
      const section = document.createElement("div");
      section.className = "menu-cat";

      const header = document.createElement("button");
      header.className = "menu-cat-header";
      header.setAttribute("type", "button");
      header.setAttribute("aria-expanded", "false");
      header.innerHTML = `<span>${cat[currentLang]}</span><span class="menu-cat-icon" aria-hidden="true"></span>`;

      const panel = document.createElement("div");
      panel.className = "menu-cat-panel";

      if (cat.items.length === 0 && cat.note) {
        const note = document.createElement("p");
        note.className = "menu-note";
        note.textContent = cat.note[currentLang];
        panel.appendChild(note);
      } else {
        const list = document.createElement("ul");
        list.className = "menu-items";
        cat.items.forEach((item) => {
          const li = document.createElement("li");
          li.className = "menu-item";
          const desc = currentLang === "it" ? item.itDesc : item.enDesc;
          li.innerHTML = `
            <div class="menu-item-main">
              <span class="menu-item-name">${currentLang === "it" ? item.it : item.en}</span>
              <span class="menu-item-dots" aria-hidden="true"></span>
              <span class="menu-item-price">€ ${item.price}</span>
            </div>
            ${desc ? `<div class="menu-item-desc">${desc}</div>` : ""}
          `;
          list.appendChild(li);
        });
        panel.appendChild(list);
      }

      header.addEventListener("click", () => {
        const isOpen = section.classList.contains("is-open");
        wrap.querySelectorAll(".menu-cat").forEach((s) => {
          s.classList.remove("is-open");
          s.querySelector(".menu-cat-header").setAttribute("aria-expanded", "false");
          s.querySelector(".menu-cat-panel").style.maxHeight = null;
        });
        if (!isOpen) {
          section.classList.add("is-open");
          header.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });

      section.appendChild(header);
      section.appendChild(panel);
      wrap.appendChild(section);

      if (i === 0) {
        requestAnimationFrame(() => header.click());
      }
    });
  }

  /* ---------- Toggle lingua ---------- */
  function setLang(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    applyStaticTranslations();
    renderHours();
    renderMenu();
  }

  function initLangToggle() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  }

  /* ---------- Mappa ---------- */
  function initMap() {
    document.querySelectorAll(".js-maps-link").forEach((a) => {
      a.href = MAPS_LINK;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---------- Contatti rapidi ---------- */
  function initQuickContacts() {
    document.querySelectorAll(".js-tel-link").forEach((a) => {
      a.href = `tel:${PHONE_TEL}`;
    });
    document.querySelectorAll(".js-phone-display").forEach((el) => {
      el.textContent = PHONE_DISPLAY;
    });
    document.querySelectorAll(".js-address-display").forEach((el) => {
      el.textContent = ADDRESS;
    });
  }

  /* ---------- Form prenotazione ---------- */
  function initBookingForm() {
    const form = document.getElementById("booking-form");
    const resultBox = document.getElementById("booking-result");
    const resultText = document.getElementById("booking-message");
    const copyBtn = document.getElementById("copy-message-btn");
    const callBtn = document.getElementById("call-from-result-btn");
    if (!form) return;

    const todayISO = new Date().toISOString().slice(0, 10);
    if (form.data) form.data.setAttribute("min", todayISO);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const persone = form.persone.value;
      const data = form.data.value;
      const ora = form.ora.value;
      const telefono = form.telefono.value.trim();
      const note = form.note.value.trim();

      const dataLeggibile = data
        ? new Date(data + "T00:00:00").toLocaleDateString(currentLang === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "long", year: "numeric" })
        : "";

      const msg = currentLang === "it"
        ? `Prenotazione Al Grottino Dal 1912 — Nome: ${nome}. Persone: ${persone}. Data: ${dataLeggibile}. Ora: ${ora}. Numero di richiamo: ${telefono}.${note ? " Note: " + note + "." : ""}`
        : `Booking for Al Grottino Dal 1912 — Name: ${nome}. Guests: ${persone}. Date: ${dataLeggibile}. Time: ${ora}. Callback number: ${telefono}.${note ? " Notes: " + note + "." : ""}`;

      resultText.textContent = msg;
      resultBox.hidden = false;
      resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(resultText.textContent);
          const original = I18N["prenota.copia"][currentLang];
          copyBtn.textContent = I18N["prenota.copiato"][currentLang];
          setTimeout(() => (copyBtn.textContent = original), 1800);
        } catch (err) {
          /* clipboard non disponibile: nessun blocco */
        }
      });
    }

    if (callBtn) {
      callBtn.addEventListener("click", () => {
        window.location.href = `tel:${PHONE_TEL}`;
      });
    }
  }

  /* ---------- Nav mobile ---------- */
  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Header ombra allo scroll + reveal ---------- */
  function initScrollEffects() {
    const header = document.querySelector(".site-header");
    if (header) {
      window.addEventListener("scroll", () => {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
      });
    }

    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      revealEls.forEach((el) => {
        el.classList.add("reveal-armed");
        io.observe(el);
      });
      setTimeout(() => {
        revealEls.forEach((el) => el.classList.add("is-visible"));
      }, 4000);
    }
  }

  /* ---------- Bottone "Prenota" flottante ----------
     Compare dopo l'hero, sparisce quando la sezione prenotazione
     (o il footer) è già visibile, per non essere ridondante. */
  function initStickyBook() {
    const sticky = document.getElementById("sticky-book");
    const hero = document.querySelector(".hero");
    const bookingSection = document.getElementById("prenota");
    if (!sticky || !hero || !bookingSection) return;

    let heroPassed = false;
    let bookingVisible = false;

    const updateVisibility = () => {
      sticky.classList.toggle("is-visible", heroPassed && !bookingVisible);
    };

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            heroPassed = !entry.isIntersecting;
            updateVisibility();
          });
        },
        { threshold: 0 }
      ).observe(hero);

      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            bookingVisible = entry.isIntersecting;
            updateVisibility();
          });
        },
        { threshold: 0.2 }
      ).observe(bookingSection);
    }

    sticky.addEventListener("click", () => {
      bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------- Anno footer ---------- */
  function initFooterYear() {
    const el = document.getElementById("footer-year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyStaticTranslations();
    renderHours();
    renderMenu();
    initLangToggle();
    initMap();
    initQuickContacts();
    initBookingForm();
    initMobileNav();
    initScrollEffects();
    initStickyBook();
    initFooterYear();
  });
})();
