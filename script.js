(function () {
    const elements = document.querySelectorAll(".entrance");
    if (!elements.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach(function (element) {
            element.classList.add("entered");
        });
        return;
    }

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            elements.forEach(function (element) {
                element.classList.add("entered");
            });
        });
    });
})();

(function () {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("site-theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || preferredTheme;

    root.setAttribute("data-theme", initialTheme);

    if (toggle) {
        toggle.addEventListener("click", function () {
            const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", nextTheme);
            localStorage.setItem("site-theme", nextTheme);
        });
    }
})();

(function () {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("siteNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        nav.classList.toggle("open", !expanded);
    });

    nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
})();

(function () {
    const list = document.getElementById("publicationList");
    const toggle = document.getElementById("publicationToggle");
    if (!list || !toggle) return;

    const hiddenItems = list.querySelectorAll(".publication-hidden");
    if (!hiddenItems.length) {
        toggle.hidden = true;
        return;
    }

    toggle.addEventListener("click", function () {
        const expanded = list.classList.toggle("expanded");
        toggle.setAttribute("aria-expanded", String(expanded));
        toggle.classList.toggle("publication-toggle-expanded", expanded);
        const label = toggle.querySelector(".publication-toggle-label");
        if (label) {
            label.textContent = expanded ? "Show fewer publications" : "Show all publications";
        }
    });
})();

(function () {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxEnlarge = document.getElementById("lightboxEnlarge");
    if (!lightbox || !lightboxImage || !lightboxEnlarge) return;

    function closeLightbox() {
        lightbox.classList.remove("lightbox--open");
        document.body.style.overflow = "";
    }

    function openLightbox(src, alt, pdf) {
        lightboxImage.src = src;
        lightboxImage.alt = alt || "";
        lightboxEnlarge.href = pdf || src;
        lightbox.classList.add("lightbox--open");
        document.body.style.overflow = "hidden";
    }

    document.querySelectorAll("[data-lightbox]").forEach(function (button) {
        button.addEventListener("click", function () {
            openLightbox(
                button.getAttribute("data-lightbox"),
                button.getAttribute("data-lightbox-alt"),
                button.getAttribute("data-lightbox-pdf")
            );
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox || event.target.classList.contains("lightbox__backdrop")) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && lightbox.classList.contains("lightbox--open")) {
            closeLightbox();
        }
    });
})();
