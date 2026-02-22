(() => {
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
      menuToggle.setAttribute("aria-label", isMenuOpen ? "Zamknij menu" : "Otwórz menu");
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
  const roles = [
    "grafików",
    "UI/UX designerów",
    "motion designerów",
    "freelancerów dev",
    "małych studiów",
  ];
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
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
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
        alt: imgEl instanceof HTMLImageElement ? imgEl.getAttribute("alt") || "" : "",
      };
    };

    const slides = [extractSlideData(heroSliderStage), ...thumbCards.map(extractSlideData)].filter(
      (slide) => slide.src
    );

    const slideCopyByLabel = {
      Dashboard: {
        heroTitle: "Kontroluj czas pracy",
        heroAccent: "bez zabijania flow.",
        heroLead:
          "TimeFlow automatycznie zbiera dane, porządkuje sesje i pomaga przypisać czas do projektów. Dziś: tracking + analityka + AI sugestie + import/export + sync MVP. Jutro: pełny menedżer projektów z customowym drzewem folderów.",
        showcaseTitle: "Dashboard, projekty, sesje i analityka w jednym workflow",
        showcaseNote:
          "Główny widok pokazuje dashboard pracy. Poniżej najważniejsze moduły, które budują codzienny workflow freelancera: Projects, Sessions, Analysis, Estimates i AI.",
      },
      Projects: {
        heroTitle: "Uporządkuj projekty",
        heroAccent: "i foldery bez chaosu.",
        heroLead:
          "Buduj strukturę klientów i projektów, przypisuj aplikacje, sesje i statusy. TimeFlow pomaga przejść od surowego trackingu do realnego porządku pracy.",
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
          "Zobacz surowe wpisy i uporządkuj je w workflow projektowy. TimeFlow wspiera ręczne poprawki oraz sugestie przypisań na podstawie historii pracy.",
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
        heroLead.textContent = copy.heroLead;
        showcaseHeadline.textContent = copy.showcaseTitle;
        showcaseNote.textContent = copy.showcaseNote;
      };

      const updateStageImage = (slide) => {
        heroShotCaptionLabel.textContent = slide.label || "";
        heroShotCaptionMeta.textContent = slide.meta || "";

        const currentSrc = heroShotImage.getAttribute("src") || "";
        if (currentSrc !== slide.src) {
          heroSliderStage.classList.remove("is-loaded", "is-missing");
          heroShotImage.setAttribute("src", slide.src);
        }

        heroShotImage.setAttribute("alt", slide.alt || slide.label || "Zrzut ekranu TimeFlow");

        if (heroShotImage.complete) {
          if (heroShotImage.naturalWidth > 0 && heroShotImage.naturalHeight > 0) {
            markStageLoaded();
          } else {
            markStageMissing();
          }
        }
      };

      const updateThumbs = () => {
        thumbCards.forEach((card, thumbIndex) => {
          const isActive = activeIndex === thumbIndex + 1;
          card.classList.toggle("is-active", isActive);
          card.setAttribute("aria-pressed", String(isActive));
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
        if (activeIndex < 1) return;
        const activeThumb = thumbCards[activeIndex - 1];
        if (!(activeThumb instanceof HTMLElement)) return;
        activeThumb.scrollIntoView({
          block: "nearest",
          inline: "center",
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      };

      const selectSlide = (index, options = {}) => {
        const shouldScrollThumb = options.scrollThumb !== false;
        activeIndex = ((index % slides.length) + slides.length) % slides.length;
        const slide = slides[activeIndex];
        if (!slide) return;

        updateStageImage(slide);
        updateCopy(slide);
        updateThumbs();
        updateDots();
        updateCounter();

        if (shouldScrollThumb) {
          focusThumbInRail();
        }
      };

      thumbCards.forEach((card, thumbIndex) => {
        if (!(card instanceof HTMLElement)) return;

        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Pokaż screen: ${slides[thumbIndex + 1]?.label || "widok"}`);

        card.addEventListener("click", () => {
          selectSlide(thumbIndex + 1);
        });

        card.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          selectSlide(thumbIndex + 1);
        });
      });

      slides.forEach((slide, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "showcase-dot";
        dot.setAttribute("aria-label", `Pokaż screen: ${slide.label}`);
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

      selectSlide(0, { scrollThumb: false });
    }
  }

  const betaForm = document.getElementById("betaForm");
  const formFeedback = document.getElementById("betaFormFeedback");

  if (betaForm && betaForm instanceof HTMLFormElement) {
    betaForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!formFeedback) return;

      formFeedback.classList.remove("is-error", "is-success");
      const formData = new FormData(betaForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const role = String(formData.get("role") || "").trim();
      const consent = formData.get("consent");

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailOk || !role || !consent) {
        formFeedback.textContent =
          "Uzupełnij imię, poprawny e-mail, branżę i zgodę na kontakt.";
        formFeedback.classList.add("is-error");
        return;
      }

      const submitBtn = betaForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn instanceof HTMLButtonElement) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Wysyłanie...";
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
              "Nie udało się wysłać formularza."
          );
        }

        formFeedback.textContent =
          result.message || "Dziękujemy. Zgłoszenie zostało zapisane.";
        formFeedback.classList.add("is-success");
        betaForm.reset();
      } catch (error) {
        formFeedback.textContent =
          error instanceof Error && error.message
            ? error.message
            : "Błąd połączenia. Spróbuj ponownie za chwilę.";
        formFeedback.classList.add("is-error");
      } finally {
        if (submitBtn instanceof HTMLButtonElement) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText || "Wyślij zgłoszenie";
        }
      }
    });
  }
})();
