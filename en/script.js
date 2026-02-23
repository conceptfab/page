(() => {
  const TIMEFLOW_WORDMARK_HTML = '<span class="tf-style">TIMEFLOW</span>';
  const TIMEFLOW_REGEX = /\bTIMEFLOW\b/g;

  const withTimeflowWordmark = (value) =>
    String(value ?? "").replace(TIMEFLOW_REGEX, TIMEFLOW_WORDMARK_HTML);

  const setTextWithTimeflowWordmark = (el, value) => {
    if (!(el instanceof HTMLElement)) return;
    el.innerHTML = withTimeflowWordmark(value);
  };

  const wrapTimeflowTextNodes = (root) => {
    if (!(root instanceof Node)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!(node instanceof Text)) continue;
      if (!node.nodeValue || !node.nodeValue.includes("TIMEFLOW")) continue;
      const parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest(".tf-style")) continue;
      if (parent.closest("script, style, noscript, textarea, option")) continue;
      textNodes.push(node);
    }

    for (const textNode of textNodes) {
      const original = textNode.nodeValue || "";
      const next = withTimeflowWordmark(original);
      if (next === original) continue;
      const range = document.createRange();
      range.selectNode(textNode);
      textNode.replaceWith(range.createContextualFragment(next));
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
      menuToggle.setAttribute("aria-label", isMenuOpen ? "Close menu" : "Open menu");
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
    "designers",
    "UI/UX designers",
    "motion designers",
    "dev freelancers",
    "small studios",
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
        alt: imgEl instanceof HTMLImageElement ? imgEl.getAttribute("alt") || "" : "",
      };
    };

    const slides = thumbCards.map(extractSlideData).filter((slide) => slide.src);

    const slideCopyByLabel = {
      Dashboard: {
        heroTitle: "Stay on top of your work time",
        heroAccent: "without breaking flow.",
        heroLead:
          "TIMEFLOW automatically collects data, organizes sessions and helps you assign time to projects. Today: tracking + analytics + AI suggestions + import/export + online sync. Coming next: a full project manager with a custom folder tree.",
        showcaseTitle: "Dashboard, projects, sessions and analytics in one workflow",
        showcaseNote:
          "The main view shows your work dashboard. Below are the key modules that build a freelancer's daily workflow: Projects, Sessions, Analysis, Estimates and AI.",
      },
      Projects: {
        heroTitle: "Organize your projects",
        heroAccent: "and folders without the chaos.",
        heroLead:
          "Build your client and project structure, assign apps, sessions and statuses. TIMEFLOW helps you go from raw tracking to real order.",
        showcaseTitle: "Projects: folders, statuses and quick assignments",
        showcaseNote:
          "The Projects view organizes your work structure. Build your tree, set statuses and map sessions to projects faster.",
      },
      Sessions: {
        heroTitle: "Clean up and assign sessions",
        heroAccent: "in seconds.",
        heroLead:
          "Session grouping, quick corrections and AI suggestions cut down the time you spend sorting through your day. Less clicking, more actual work.",
        showcaseTitle: "Sessions: daily sessions, grouping and assignments",
        showcaseNote:
          "See raw entries and organize them into a project workflow. TIMEFLOW supports manual corrections and assignment suggestions based on your work history.",
      },
      "Time Analysis": {
        heroTitle: "See where your time goes",
        heroAccent: "and when you hit peak flow.",
        heroLead:
          "Charts and a heatmap help you spot repeating work patterns. That makes it easier to plan focus blocks, quotes and realistic deadlines.",
        showcaseTitle: "Time Analysis: charts, heatmap and work patterns",
        showcaseNote:
          "Analytics shows not just hour totals but also the rhythm of your day and week. That helps you make better decisions about planning and pricing.",
      },
      Estimates: {
        heroTitle: "Quote from actual data,",
        heroAccent: "not gut feeling.",
        heroLead:
          "The Estimates module connects real work time with rates and multipliers. Build consistent quotes faster and keep a better eye on project profitability.",
        showcaseTitle: "Estimates: rates, multipliers and project quotes",
        showcaseNote:
          "Quotes are based on real time, not just intuition. That helps you keep your offers consistent and have better conversations with clients about scope.",
      },
      "AI & Model": {
        heroTitle: "AI suggests assignments.",
        heroAccent: "You stay in control.",
        heroLead:
          "suggest and auto_safe modes help automate assignments without losing control of your data. Train the model and roll back the last batch of changes any time.",
        showcaseTitle: "AI & Model: suggestions, thresholds and model training",
        showcaseNote:
          "The AI panel shows work modes, confidence thresholds and model status. An automation layer built to speed up your workflow, not complicate it.",
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
        setTextWithTimeflowWordmark(heroLead, copy.heroLead);
        setTextWithTimeflowWordmark(showcaseHeadline, copy.showcaseTitle);
        setTextWithTimeflowWordmark(showcaseNote, copy.showcaseNote);
      };

      const updateStageImage = (slide) => {
        heroShotCaptionLabel.textContent = slide.label || "";
        heroShotCaptionMeta.textContent = slide.meta || "";
        const currentSrc = heroShotImage.getAttribute("src") || "";
        if (currentSrc !== slide.src) {
          heroSliderStage.classList.remove("is-loaded", "is-missing");
          heroShotImage.setAttribute("src", slide.src);
        }
        heroShotImage.setAttribute("alt", slide.alt || slide.label || "TIMEFLOW screenshot");
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
          if (currentSrc !== slide.src) {
            card.classList.remove("is-loaded", "is-missing");
            imgEl.setAttribute("src", slide.src);
          }

          imgEl.setAttribute("alt", slide.alt || slide.label || "TIMEFLOW screenshot");

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
          card.classList.toggle("is-active", isActive);
          card.setAttribute("aria-pressed", String(isActive));
          card.setAttribute("aria-label", `Show screen: ${slide.label || "view"}`);
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
        dot.setAttribute("aria-label", `Show screen: ${slide.label}`);
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trackedFields = ["name", "email", "role", "consent"]
      .map((name) => betaForm.elements.namedItem(name))
      .filter(
        (field) =>
          field instanceof HTMLInputElement ||
          field instanceof HTMLSelectElement ||
          field instanceof HTMLTextAreaElement
      );

    const fieldMessages = {
      name: "Please enter your name or handle.",
      email: "Please enter a valid email address.",
      role: "Please choose your industry.",
      consent: "Please confirm consent to contact you about beta testing.",
    };

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
        formFeedback.textContent = "Please fix the highlighted fields and try again.";
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
        submitBtn.textContent = "Sending…";
      }

      try {
        formData.set("source", "timeflow_landing_en");
        formData.set("submitted_at_iso", new Date().toISOString());

        const response = await fetch(betaForm.action || "../form-handler.php", {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
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
              "Failed to submit the form."
          );
        }

        formFeedback.textContent = result.message || "Thank you. Your application has been saved.";
        formFeedback.classList.add("is-success");
        betaForm.reset();
        trackedFields.forEach((field) => clearFieldError(field));
        formFeedback.focus({ preventScroll: true });
      } catch (error) {
        formFeedback.textContent =
          error instanceof Error && error.message
            ? error.message
            : "Connection error. Please try again in a moment.";
        formFeedback.classList.add("is-error");
      } finally {
        betaForm.removeAttribute("aria-busy");
        if (submitBtn instanceof HTMLButtonElement) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText || "Submit application";
        }
      }
    });
  }
  wrapTimeflowTextNodes(document.body);
})();
