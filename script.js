(() => {
  const TIMEFLOW_WORDMARK_HTML = '<span class="tf-style">TIMEFLOW</span>';
  const TIMEFLOW_REGEX = /\bTIMEFLOW\b/g;

  const lang = document.documentElement.lang === "en" ? "en" : "pl";
  const messages = {
    pl: {
      menuOpen: "Otwórz menu",
      menuClose: "Zamknij menu",
      showScreen: "Pokaż screen",
      roles: ["grafików", "UI/UX designerów", "motion designerów", "freelancerów dev", "małych studiów"],
      fieldMessages: {
        name: "Podaj imię lub nick.",
        email: "Podaj poprawny adres e-mail.",
        role: "Wybierz branżę.",
        consent: "Zaznacz zgodę na kontakt w sprawie testów beta.",
      },
      formError: "Popraw oznaczone pola i spróbuj ponownie.",
      formSending: "Wysyłanie…",
      formSuccess: "Dziękujemy. Zgłoszenie zostało zapisane.",
      formConnError: "Błąd połączenia. Spróbuj ponownie za chwilę.",
      imgAlt: "Zrzut ekranu TIMEFLOW",
    },
    en: {
      menuOpen: "Open menu",
      menuClose: "Close menu",
      showScreen: "Show screen",
      roles: ["designers", "UI/UX designers", "motion designers", "dev freelancers", "small studios"],
      fieldMessages: {
        name: "Please Provide your name or nick.",
        email: "Please provide a valid email address.",
        role: "Please choose your industry.",
        consent: "Please check the consent to contact regarding beta tests.",
      },
      formError: "Please correct the marked fields and try again.",
      formSending: "Sending…",
      formSuccess: "Thank you. Your application has been saved.",
      formConnError: "Connection error. Please try again in a moment.",
      imgAlt: "TIMEFLOW screenshot",
    }
  };
  const MSG = messages[lang];

  const withTimeflowWordmark = (value) =>
    String(value ?? "").replace(TIMEFLOW_REGEX, TIMEFLOW_WORDMARK_HTML);

  const setTextWithTimeflowWordmark = (el, value) => {
    if (!(el instanceof HTMLElement)) return;
    el.innerHTML = withTimeflowWordmark(value);
  };

  const wrapTimeflowTextNodes = (root) => {
    if (!(root instanceof Node)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const replacements = [];

    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!(node instanceof Text)) continue;
      if (!node.nodeValue || !node.nodeValue.includes("TIMEFLOW")) continue;
      const parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest(".tf-style")) continue;
      if (parent.closest("script, style, noscript, textarea, option")) continue;
      const original = node.nodeValue;
      const next = withTimeflowWordmark(original);
      if (next !== original) replacements.push({ node, html: next });
    }

    // Batch all DOM writes in one pass — avoids repeated layout recalc
    for (const { node, html } of replacements) {
      const tpl = document.createElement("template");
      tpl.innerHTML = html;
      node.replaceWith(tpl.content);
    }
  };

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const topbar = document.querySelector(".topbar");
  if (topbar instanceof HTMLElement) {
    const syncTopbarScrollState = () => {
      topbar.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    syncTopbarScrollState();
    window.addEventListener("scroll", syncTopbarScrollState, { passive: true });
  }

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const topnav = document.querySelector(".topnav");
  if (
    topbar instanceof HTMLElement &&
    menuToggle instanceof HTMLButtonElement &&
    topnav instanceof HTMLElement
  ) {
    const mobileMenuQuery = window.matchMedia("(max-width: 960px)");
    let isMenuOpen = false;

    const syncMenuReadyState = () => {
      topbar.classList.toggle("has-mobile-menu", mobileMenuQuery.matches);
      if (!mobileMenuQuery.matches && isMenuOpen) {
        setMenuOpen(false);
      }
    };

    const setMenuOpen = (nextOpen) => {
      isMenuOpen = Boolean(nextOpen);
      topbar.classList.toggle("is-menu-open", isMenuOpen);
      menuToggle.setAttribute("aria-expanded", String(isMenuOpen));
      menuToggle.setAttribute("aria-label", isMenuOpen ? MSG.menuClose : MSG.menuOpen);
    };

    menuToggle.addEventListener("click", () => {
      if (!mobileMenuQuery.matches) return;
      setMenuOpen(!isMenuOpen);
    });

    topnav.addEventListener("click", (event) => {
      if (!mobileMenuQuery.matches) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("a")) return;
      setMenuOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !isMenuOpen) return;
      setMenuOpen(false);
      menuToggle.focus();
    });

    document.addEventListener("click", (event) => {
      if (!mobileMenuQuery.matches || !isMenuOpen) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (topbar.contains(target)) return;
      setMenuOpen(false);
    });

    syncMenuReadyState();
    if (typeof mobileMenuQuery.addEventListener === "function") {
      mobileMenuQuery.addEventListener("change", syncMenuReadyState);
    } else if (typeof mobileMenuQuery.addListener === "function") {
      mobileMenuQuery.addListener(syncMenuReadyState);
    }
  }

  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
  for (const el of revealEls) {
    const delay = Number(el.getAttribute("data-delay") || "0");
    el.style.setProperty("--reveal-delay", String(delay));
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -30px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  const roleRotator = document.getElementById("heroRoleRotator");
  const roles = MSG.roles;
  let roleIndex = 0;
  if (roleRotator && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleRotator.textContent = roles[roleIndex];
    }, 2400);
  }

  const counters = Array.from(document.querySelectorAll("[data-counter]"));
  const animateCounter = (el) => {
    const target = Number(el.getAttribute("data-counter") || "0");
    const startValue = Number(el.textContent || "0");
    if (!Number.isFinite(target)) return;
    if (Number.isFinite(startValue) && startValue === target) {
      el.textContent = String(target);
      return;
    }
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const base = Number.isFinite(startValue) ? startValue : 0;
      el.textContent = String(Math.round(base + (target - base) * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (counters.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const innerCounters = entry.target.querySelectorAll("[data-counter]");
            innerCounters.forEach((el) => {
              if (el.dataset.animated === "1") return;
              el.dataset.animated = "1";
              animateCounter(el);
            });
            obs.unobserve(entry.target);
          }
        },
        { threshold: 0.5 }
      );

      document.querySelectorAll("[data-counter-card]").forEach((card) => observer.observe(card));
    } else {
      counters.forEach((el) => animateCounter(el));
    }
  }

  const shotCards = Array.from(document.querySelectorAll("[data-shot-card]"));
  shotCards.forEach((card) => {
    const img = card.querySelector(".shot-image");
    if (!(img instanceof HTMLImageElement)) return;

    const markLoaded = () => {
      card.classList.add("is-loaded");
      card.classList.remove("is-missing");
    };

    const markMissing = () => {
      card.classList.add("is-missing");
      card.classList.remove("is-loaded");
    };

    img.addEventListener("load", markLoaded, { once: true });
    img.addEventListener("error", markMissing, { once: true });

    if (img.complete) {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        markLoaded();
      } else {
        markMissing();
      }
    }
  });

  const heroSliderRoot = document.querySelector("[data-hero-slider]");
  const heroSliderStage = document.querySelector("[data-hero-slider-stage]");
  const heroShotImage = document.getElementById("heroShotImage");
  const heroShotCaptionLabel = document.getElementById("heroShotCaptionLabel");
  const heroShotCaptionMeta = document.getElementById("heroShotCaptionMeta");
  const heroHeadline = document.getElementById("heroHeadline");
  const heroLead = document.getElementById("heroLead");
  const showcaseHeadline = document.getElementById("showcaseHeadline");
  const showcaseNote = document.getElementById("showcaseNote");
  const heroSliderPrev = document.querySelector("[data-hero-slider-prev]");
  const heroSliderNext = document.querySelector("[data-hero-slider-next]");
  const heroSliderDots = document.querySelector("[data-hero-slider-dots]");
  const heroSliderCounter = document.querySelector("[data-hero-slider-counter]");

  if (
    heroSliderRoot &&
    heroSliderStage instanceof HTMLElement &&
    heroShotImage instanceof HTMLImageElement &&
    heroShotCaptionLabel &&
    heroShotCaptionMeta &&
    heroHeadline &&
    heroLead &&
    showcaseHeadline &&
    showcaseNote &&
    heroSliderDots
  ) {
    const thumbCards = Array.from(document.querySelectorAll(".shot-rail [data-hero-slide-source]"));
    const extractSlideData = (card) => {
      const labelEl = card.querySelector(".shot-caption span");
      const metaEl = card.querySelector(".shot-caption em");
      const imgEl = card.querySelector(".shot-image");
      return {
        label: labelEl ? labelEl.textContent.trim() : "",
        meta: metaEl ? metaEl.textContent.trim() : "",
        src: imgEl instanceof HTMLImageElement ? imgEl.getAttribute("src") || "" : "",
        srcset: imgEl instanceof HTMLImageElement ? imgEl.getAttribute("srcset") || "" : "",
        alt: imgEl instanceof HTMLImageElement ? imgEl.getAttribute("alt") || "" : "",
      };
    };

    const slides = thumbCards.map(extractSlideData).filter((slide) => slide.src);

    const slideCopyByLabel = (lang === 'en') ? {
      Dashboard: {
        heroTitle: "Control your work time",
        heroAccent: "without killing the flow.",
        heroLead:
          "TIMEFLOW automatically collects data, organizes sessions and helps assign time to projects. Today: tracking + analytics + AI suggestions + import/export + sync MVP. Tomorrow: full project manager with custom folder tree.",
        showcaseTitle: "Dashboard, projects, sessions and analytics in one workflow",
        showcaseNote:
          "The main view shows the work dashboard. Below are the key modules that build a freelancer's daily workflow: Projects, Sessions, Analysis, Estimates and AI.",
      },
      Projects: {
        heroTitle: "Organize projects",
        heroAccent: "and folders without chaos.",
        heroLead:
          "Build a structure for clients and projects, assign apps, sessions and statuses. TIMEFLOW helps move from raw tracking to real order of work.",
        showcaseTitle: "Projects: folders, statuses and quick assignments",
        showcaseNote:
          "The Projects view organizes the workflow of a freelancer and studio. You can build a tree, mark statuses and faster map sessions to projects.",
      },
      Sessions: {
        heroTitle: "Clean and assign sessions",
        heroAccent: "in seconds.",
        heroLead:
          "Grouping sessions, quick corrections and AI suggestions shorten the manual organizational time of your workday. Less clicking, more real work.",
        showcaseTitle: "Sessions: daily sessions, grouping and assignments",
        showcaseNote:
          "See raw entries and organize them into project workflow. TIMEFLOW supports manual corrections and assignment suggestions based on work history.",
      },
      "Time Analysis": {
        heroTitle: "See where your time goes",
        heroAccent: "and when you peak flow.",
        heroLead:
          "Charts and heatmaps help you find repeatable work patterns. This makes it easier to plan focus blocks, estimates and real deadlines.",
        showcaseTitle: "Time Analysis: charts, heatmap and work patterns",
        showcaseNote:
          "Analytics shows not just total hours, but also the rhythm of the day and week. This helps you make better decisions about planning and estimates.",
      },
      Estimates: {
        heroTitle: "Estimate based on data",
        heroAccent: "instead of guessing.",
        heroLead:
          "Estimates module connects real work time with rates and multipliers. You create consistent estimates faster and take better care of project profitability.",
        showcaseTitle: "Estimates: rates, multipliers and project valuations",
        showcaseNote:
          "Valuations are based on actual time, not just intuition. This helps maintain offer consistency and better conversations with clients about project scope.",
      },
      "AI & Model": {
        heroTitle: "AI suggests assignments",
        heroAccent: "You keep control.",
        heroLead:
          "Suggest and auto_safe modes help automate assignments without losing control over data. You can train the model and rollback latest batch of changes.",
        showcaseTitle: "AI & Model: suggestions, thresholds and model training",
        showcaseNote:
          "AI panel shows working modes, confidence thresholds and model status. It's an automation layer designed to speed up workflow, not complicate it.",
      },
    } : {
      Dashboard: {
        heroTitle: "Kontroluj czas pracy",
        heroAccent: "bez zabijania flow.",
        heroLead:
          "TIMEFLOW automatycznie zbiera dane, porządkuje sesje i pomaga przypisać czas do projektów. Dziś: tracking + analityka + AI sugestie + import/export + sync MVP. Jutro: pełny menedżer projektów z customowym drzewem folderów.",
        showcaseTitle: "Dashboard, projekty, sesje i analityka w jednym workflow",
        showcaseNote:
          "Główny widok pokazuje dashboard pracy. Poniżej najważniejsze moduły, które budują codzienny workflow freelancera: Projects, Sessions, Analysis, Estimates i AI.",
      },
      Projects: {
        heroTitle: "Uporządkuj projekty",
        heroAccent: "i foldery bez chaosu.",
        heroLead:
          "Buduj strukturę klientów i projektów, przypisuj aplikacje, sesje i statusy. TIMEFLOW pomaga przejść od surowego trackingu do realnego porządku pracy.",
        showcaseTitle: "Projects: foldery, statusy i szybkie przypisania",
        showcaseNote:
          "Widok Projects porządkuje strukturę pracy freelancera i studia. Możesz budować drzewo, oznaczać statusy oraz szybciej mapować sesje do projektów.",
      },
      Sessions: {
        heroTitle: "Czyść i przypisuj sesje",
        heroAccent: "w kilka sekund.",
        heroLead:
          "Grupowanie sesji, szybkie korekty i sugestie AI skracają czas ręcznego porządkowania dnia pracy. Mniej klikania, więcej realnej pracy.",
        showcaseTitle: "Sessions: dzienne sesje, grupowanie i przypisania",
        showcaseNote:
          "Zobacz surowe wpisy i uporządkuj je w workflow projektowy. TIMEFLOW wspiera ręczne poprawki oraz sugestie przypisań na podstawie historii pracy.",
      },
      "Time Analysis": {
        heroTitle: "Zobacz gdzie znika czas",
        heroAccent: "i kiedy masz peak flow.",
        heroLead:
          "Wykresy i heatmapa pomagają znaleźć powtarzalne wzorce pracy. Dzięki temu łatwiej planować bloki fokusowe, wyceny i realne deadline'y.",
        showcaseTitle: "Time Analysis: wykresy, heatmapa i wzorce pracy",
        showcaseNote:
          "Analityka pokazuje nie tylko sumy godzin, ale też rytm dnia i tygodnia. To pomaga podejmować lepsze decyzje o planowaniu i wycenie.",
      },
      Estimates: {
        heroTitle: "Wyceniaj na podstawie danych",
        heroAccent: "zamiast zgadywać.",
        heroLead:
          "Moduł Estimates łączy realny czas pracy ze stawkami i mnożnikami. Szybciej tworzysz spójne wyceny i lepiej pilnujesz rentowności projektów.",
        showcaseTitle: "Estimates: stawki, mnożniki i wyceny projektów",
        showcaseNote:
          "Wyceny bazują na rzeczywistym czasie, nie tylko intuicji. To pomaga utrzymać spójność ofert i lepiej rozmawiać z klientem o zakresie pracy.",
      },
      "AI & Model": {
        heroTitle: "AI sugeruje przypisania",
        heroAccent: "Ty zachowujesz kontrolę.",
        heroLead:
          "Tryby suggest i auto_safe pomagają automatyzować przypisania bez utraty kontroli nad danymi. Możesz trenować model i cofnąć ostatnią paczkę zmian.",
        showcaseTitle: "AI & Model: sugestie, progi i trening modelu",
        showcaseNote:
          "Panel AI pokazuje tryby pracy, progi pewności i status modelu. To warstwa automatyzacji, która ma przyspieszać workflow, a nie go komplikować.",
      },
    };

    if (slides.length) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let activeIndex = 0;
      let transitionTimer = 0;
      const dotButtons = [];
      const markStageLoaded = () => {
        heroSliderStage.classList.add("is-loaded");
        heroSliderStage.classList.remove("is-missing");
      };

      const markStageMissing = () => {
        heroSliderStage.classList.add("is-missing");
        heroSliderStage.classList.remove("is-loaded");
      };

      heroShotImage.addEventListener("load", markStageLoaded);
      heroShotImage.addEventListener("error", markStageMissing);

      const updateCopy = (slide) => {
        const copy = slideCopyByLabel[slide.label] || slideCopyByLabel.Dashboard;
        heroHeadline.innerHTML = `${copy.heroTitle} <span>${copy.heroAccent}</span>`;
        setTextWithTimeflowWordmark(heroLead, copy.heroLead);
        setTextWithTimeflowWordmark(showcaseHeadline, copy.showcaseTitle);
        setTextWithTimeflowWordmark(showcaseNote, copy.showcaseNote);
      };

      const updateStageImage = (slide) => {
        heroShotCaptionLabel.textContent = slide.label || "";
        heroShotCaptionMeta.textContent = slide.meta || "";

        const currentSrc = heroShotImage.getAttribute("src") || "";
        const currentSrcset = heroShotImage.getAttribute("srcset") || "";

        if (currentSrc !== slide.src || currentSrcset !== slide.srcset) {
          heroSliderStage.classList.remove("is-loaded", "is-missing");
          heroShotImage.setAttribute("src", slide.src);
          if (slide.srcset) {
            heroShotImage.setAttribute("srcset", slide.srcset);
          } else {
            heroShotImage.removeAttribute("srcset");
          }
        }

        heroShotImage.setAttribute("alt", slide.alt || slide.label || MSG.imgAlt);

        if (heroShotImage.complete) {
          if (heroShotImage.naturalWidth > 0 && heroShotImage.naturalHeight > 0) {
            markStageLoaded();
          } else {
            markStageMissing();
          }
        }
      };

      const updateThumbCard = (card, slide) => {
        if (!(card instanceof HTMLElement) || !slide) return;

        const labelEl = card.querySelector(".shot-caption span");
        const metaEl = card.querySelector(".shot-caption em");
        const imgEl = card.querySelector(".shot-image");

        if (labelEl) {
          labelEl.textContent = slide.label || "";
        }
        if (metaEl) {
          metaEl.textContent = slide.meta || "";
        }

        if (imgEl instanceof HTMLImageElement) {
          const currentSrc = imgEl.getAttribute("src") || "";
          const currentSrcset = imgEl.getAttribute("srcset") || "";

          if (currentSrc !== slide.src || currentSrcset !== slide.srcset) {
            card.classList.remove("is-loaded", "is-missing");
            imgEl.setAttribute("src", slide.src);
            if (slide.srcset) {
              imgEl.setAttribute("srcset", slide.srcset);
            } else {
              imgEl.removeAttribute("srcset");
            }
          }

          imgEl.setAttribute("alt", slide.alt || slide.label || MSG.imgAlt);

          if (imgEl.complete) {
            if (imgEl.naturalWidth > 0 && imgEl.naturalHeight > 0) {
              card.classList.add("is-loaded");
              card.classList.remove("is-missing");
            } else {
              card.classList.add("is-missing");
              card.classList.remove("is-loaded");
            }
          }
        }
      };

      const updateThumbs = () => {
        thumbCards.forEach((card, thumbIndex) => {
          if (!(card instanceof HTMLElement)) return;
          const slide = slides[thumbIndex];

          if (!slide) {
            card.hidden = true;
            card.removeAttribute("data-slide-index");
            return;
          }

          card.hidden = false;
          card.dataset.slideIndex = String(thumbIndex);
          const isActive = thumbIndex === activeIndex;
          card.setAttribute("aria-pressed", String(isActive));
          card.setAttribute("aria-label", `${MSG.showScreen}: ${slide.label || ""}`);
          updateThumbCard(card, slide);
        });
      };

      const updateDots = () => {
        dotButtons.forEach((dot, dotIndex) => {
          const isActive = dotIndex === activeIndex;
          dot.classList.toggle("is-active", isActive);
          dot.setAttribute("aria-current", isActive ? "true" : "false");
        });
      };

      const updateCounter = () => {
        if (!heroSliderCounter) return;
        heroSliderCounter.textContent = `${activeIndex + 1} / ${slides.length}`;
      };

      const focusThumbInRail = () => {
        if (activeIndex < 0) return;
        const thumb = thumbCards[activeIndex];
        if (!(thumb instanceof HTMLElement)) return;
        thumb.scrollIntoView({
          block: "nearest",
          inline: "center",
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      };

      const heroCopy = document.querySelector(".hero-copy");

      const clearTransition = () => {
        clearTimeout(transitionTimer);
        transitionTimer = 0;
        heroSliderStage.classList.remove("is-transitioning", "is-entering");
        if (heroCopy) heroCopy.classList.remove("is-copy-transitioning", "is-copy-entering");
      };

      const selectSlide = (index, options = {}) => {
        const shouldScrollThumb = options.scrollThumb !== false;
        const prevIndex = activeIndex;
        activeIndex = ((index % slides.length) + slides.length) % slides.length;
        const slide = slides[activeIndex];
        if (!slide) return;

        const isFirstLoad = options.scrollThumb === false && prevIndex === 0;
        const isSameSlide = prevIndex === activeIndex;

        clearTransition();

        if (prefersReducedMotion || isFirstLoad || isSameSlide) {
          updateStageImage(slide);
          updateCopy(slide);
          updateThumbs();
          updateDots();
          updateCounter();
          if (shouldScrollThumb) focusThumbInRail();
          return;
        }

        heroSliderStage.classList.add("is-transitioning");
        if (heroCopy) heroCopy.classList.add("is-copy-transitioning");

        updateThumbs();
        updateDots();
        updateCounter();
        if (shouldScrollThumb) focusThumbInRail();

        transitionTimer = setTimeout(() => {
          transitionTimer = 0;
          updateStageImage(slide);
          updateCopy(slide);

          heroSliderStage.classList.remove("is-transitioning");
          heroSliderStage.classList.add("is-entering");
          if (heroCopy) {
            heroCopy.classList.remove("is-copy-transitioning");
            heroCopy.classList.add("is-copy-entering");
          }

          const onEnterEnd = () => {
            heroSliderStage.classList.remove("is-entering");
            heroSliderStage.removeEventListener("animationend", onEnterEnd);
          };
          heroSliderStage.addEventListener("animationend", onEnterEnd);

          if (heroCopy) {
            setTimeout(() => heroCopy.classList.remove("is-copy-entering"), 350);
          }
        }, 300);
      };

      thumbCards.forEach((card, thumbIndex) => {
        if (!(card instanceof HTMLElement)) return;

        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");

        card.addEventListener("click", () => {
          const slideIndex = Number.parseInt(card.dataset.slideIndex || "", 10);
          if (Number.isNaN(slideIndex)) return;
          selectSlide(slideIndex);
        });

        card.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          const slideIndex = Number.parseInt(card.dataset.slideIndex || "", 10);
          if (Number.isNaN(slideIndex)) return;
          selectSlide(slideIndex);
        });
      });

      slides.forEach((slide, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "showcase-dot";
        dot.setAttribute("aria-label", `${MSG.showScreen}: ${slide.label}`);
        dot.title = slide.label;
        dot.addEventListener("click", () => selectSlide(index));
        heroSliderDots.appendChild(dot);
        dotButtons.push(dot);
      });

      if (heroSliderPrev instanceof HTMLButtonElement) {
        heroSliderPrev.addEventListener("click", () => selectSlide(activeIndex - 1));
      }

      if (heroSliderNext instanceof HTMLButtonElement) {
        heroSliderNext.addEventListener("click", () => selectSlide(activeIndex + 1));
      }

      heroSliderRoot.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          selectSlide(activeIndex - 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          selectSlide(activeIndex + 1);
        }
      });

      // Touch / swipe support on the main stage
      let touchStartX = 0;
      let touchStartY = 0;
      let isSwiping = false;

      heroSliderStage.addEventListener("touchstart", (e) => {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
      }, { passive: true });

      heroSliderStage.addEventListener("touchmove", (e) => {
        if (!isSwiping || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        // If vertical scroll is dominant, cancel swipe detection
        if (Math.abs(dy) > Math.abs(dx)) {
          isSwiping = false;
        }
      }, { passive: true });

      heroSliderStage.addEventListener("touchend", (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        const dx = (e.changedTouches[0] || {}).clientX - touchStartX;
        const threshold = 40;
        if (Math.abs(dx) < threshold) return;
        if (dx < 0) {
          selectSlide(activeIndex + 1);
        } else {
          selectSlide(activeIndex - 1);
        }
      }, { passive: true });

      selectSlide(0, { scrollThumb: false });
    }
  }

  const betaForm = document.getElementById("betaForm");
  const formFeedback = document.getElementById("betaFormFeedback");

  if (betaForm && betaForm instanceof HTMLFormElement) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trackedFields = ["name", "email", "role", "consent"]
      .map((name) => betaForm.elements.namedItem(name))
      .filter(
        (field) =>
          field instanceof HTMLInputElement ||
          field instanceof HTMLSelectElement ||
          field instanceof HTMLTextAreaElement
      );

    const fieldMessages = MSG.fieldMessages;

    const getFieldErrorEl = (field) => {
      if (!field.name) return null;
      return betaForm.querySelector(`[data-field-error-for="${field.name}"]`);
    };

    const updateDescribedBy = (field, errorEl, shouldAttach) => {
      if (!(errorEl instanceof HTMLElement) || !errorEl.id) return;
      const current = (field.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter(Boolean);
      const next = new Set(current);
      if (shouldAttach) next.add(errorEl.id);
      if (!shouldAttach) next.delete(errorEl.id);
      if (next.size) {
        field.setAttribute("aria-describedby", Array.from(next).join(" "));
      } else {
        field.removeAttribute("aria-describedby");
      }
    };

    const clearFieldError = (field) => {
      const errorEl = getFieldErrorEl(field);
      field.removeAttribute("aria-invalid");
      const labelEl = field.closest("label");
      if (labelEl) labelEl.classList.remove("has-error");
      if (errorEl instanceof HTMLElement) {
        errorEl.textContent = "";
        updateDescribedBy(field, errorEl, false);
      }
    };

    const setFieldError = (field, message) => {
      const errorEl = getFieldErrorEl(field);
      field.setAttribute("aria-invalid", "true");
      const labelEl = field.closest("label");
      if (labelEl) labelEl.classList.add("has-error");
      if (errorEl instanceof HTMLElement) {
        errorEl.textContent = message;
        updateDescribedBy(field, errorEl, true);
      }
    };

    const validateField = (field) => {
      clearFieldError(field);

      const name = field.name;
      if (name === "name") {
        if (!String(field.value || "").trim()) {
          setFieldError(field, fieldMessages.name);
          return false;
        }
        return true;
      }

      if (name === "email") {
        const value = String(field.value || "").trim();
        if (!emailPattern.test(value)) {
          setFieldError(field, fieldMessages.email);
          return false;
        }
        return true;
      }

      if (name === "role") {
        if (!String(field.value || "").trim()) {
          setFieldError(field, fieldMessages.role);
          return false;
        }
        return true;
      }

      if (name === "consent" && field instanceof HTMLInputElement) {
        if (!field.checked) {
          setFieldError(field, fieldMessages.consent);
          return false;
        }
        return true;
      }

      return true;
    };

    const validateRequiredFields = () => {
      let firstInvalid = null;
      trackedFields.forEach((field) => {
        const ok = validateField(field);
        if (!ok && !firstInvalid) firstInvalid = field;
      });
      return { ok: !firstInvalid, firstInvalid };
    };

    trackedFields.forEach((field) => {
      const onValidate = () => {
        const isCheckbox = field instanceof HTMLInputElement && field.type === "checkbox";
        const hasValue = isCheckbox ? field.checked : String(field.value || "").trim().length > 0;
        if (hasValue || field.getAttribute("aria-invalid") === "true") {
          validateField(field);
        }
      };

      field.addEventListener("blur", onValidate);
      field.addEventListener("change", onValidate);
      if (!(field instanceof HTMLInputElement && field.type === "checkbox")) {
        field.addEventListener("input", onValidate);
      }
    });

    if (formFeedback instanceof HTMLElement) {
      formFeedback.setAttribute("tabindex", "-1");
    }

    betaForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!(formFeedback instanceof HTMLElement)) return;

      formFeedback.classList.remove("is-error", "is-success");
      formFeedback.textContent = "";

      const validation = validateRequiredFields();
      if (!validation.ok) {
        formFeedback.textContent = MSG.formError;
        formFeedback.classList.add("is-error");
        if (validation.firstInvalid instanceof HTMLElement) {
          validation.firstInvalid.focus();
        }
        return;
      }

      const formData = new FormData(betaForm);
      const submitBtn = betaForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : "";
      betaForm.setAttribute("aria-busy", "true");
      if (submitBtn instanceof HTMLButtonElement) {
        submitBtn.disabled = true;
        submitBtn.textContent = MSG.formSending;
      }

      try {
        formData.set("source", "timeflow_landing");
        formData.set("submitted_at_iso", new Date().toISOString());

        const response = await fetch(betaForm.action || "./form-handler.php", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        let result = null;
        try {
          result = await response.json();
        } catch {
          result = null;
        }

        if (!response.ok || !result || result.ok !== true) {
          throw new Error(
            (result && typeof result.message === "string" && result.message) ||
            MSG.formConnError
          );
        }

        formFeedback.textContent =
          result.message || MSG.formSuccess;
        formFeedback.classList.add("is-success");
        betaForm.reset();
        trackedFields.forEach((field) => clearFieldError(field));
        formFeedback.focus({ preventScroll: true });
      } catch (error) {
        formFeedback.textContent =
          error instanceof Error && error.message
            ? error.message
            : MSG.formConnError;
        formFeedback.classList.add("is-error");
      } finally {
        betaForm.removeAttribute("aria-busy");
        if (submitBtn instanceof HTMLButtonElement) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText || "Wyślij zgłoszenie";
        }
      }
    });
  }
  // Defer DOM mutation to idle time — nie blokuje LCP
  (window.requestIdleCallback || requestAnimationFrame)(() => wrapTimeflowTextNodes(document.body));

  // --- GA4 event tracking ---
  const ga = (...args) => { if (typeof gtag === "function") gtag(...args); };

  // Form submit: generate_lead
  if (betaForm) {
    betaForm.addEventListener("submit", () => {
      const roleEl = betaForm.elements.namedItem("role");
      ga("event", "generate_lead", {
        event_category: "beta_signup",
        event_label: (roleEl instanceof HTMLSelectElement && roleEl.value) || "unknown",
      });
    });
  }

  // CTA clicks
  document.querySelectorAll('a[href="#beta"]').forEach((link) => {
    link.addEventListener("click", () => {
      ga("event", "click_cta_beta", {
        event_category: "engagement",
        event_label: link.textContent.trim(),
      });
    });
  });

  // FAQ expand
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item instanceof HTMLDetailsElement && item.open) {
        const q = item.querySelector("summary");
        ga("event", "faq_expand", {
          event_category: "engagement",
          event_label: q ? q.textContent.trim().slice(0, 80) : "",
        });
      }
    });
  });

  // Language switch
  document.querySelectorAll(".lang-link").forEach((link) => {
    link.addEventListener("click", () => {
      ga("event", "language_switch", {
        event_category: "engagement",
        event_label: link.getAttribute("hreflang") || link.textContent.trim(),
      });
    });
  });

  // Scroll depth (25%, 50%, 75%, 100%)
  const scrollDepthMarks = new Set();
  window.addEventListener("scroll", () => {
    const scrollPct = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );
    [25, 50, 75, 100].forEach((mark) => {
      if (scrollPct >= mark && !scrollDepthMarks.has(mark)) {
        scrollDepthMarks.add(mark);
        ga("event", "scroll_depth", {
          event_category: "engagement",
          event_label: mark + "%",
          value: mark,
        });
      }
    });
  }, { passive: true });

  // Section view (IntersectionObserver)
  const trackedSections = document.querySelectorAll("section[id]");
  if (trackedSections.length && "IntersectionObserver" in window) {
    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ga("event", "section_view", {
            event_category: "engagement",
            event_label: entry.target.id,
          });
          sectionObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    trackedSections.forEach((s) => sectionObs.observe(s));
  }
})();
