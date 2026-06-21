document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================================
    // 1. CARROSSEL DE PRODUTOS (Seção "Soluções Modulares")
    // ==========================================================================
    const prodSlides = document.querySelectorAll("#product-slides .carousel-slide");
    const prodDots = document.querySelectorAll("#product-dots .dot");
    const prodPrev = document.getElementById("prod-prev");
    const prodNext = document.getElementById("prod-next");
    let currentProdSlide = 0;

    function showProdSlide(index) {
        if (prodSlides.length === 0) return;

        prodSlides.forEach(slide => slide.classList.remove("active"));
        prodDots.forEach(dot => dot.classList.remove("active"));

        currentProdSlide = (index + prodSlides.length) % prodSlides.length;

        prodSlides[currentProdSlide].classList.add("active");
        if (prodDots[currentProdSlide]) {
            prodDots[currentProdSlide].classList.add("active");
        }
    }

    if (prodNext && prodPrev) {
        prodNext.addEventListener("click", () => showProdSlide(currentProdSlide + 1));
        prodPrev.addEventListener("click", () => showProdSlide(currentProdSlide - 1));
    }

    prodDots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.getAttribute("data-index") || idx);
            showProdSlide(index);
        });
    });

    // Suporte a swipe no carrossel (mobile)
    const slider = document.getElementById("product-slides");
    if (slider) {
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) {
                    showProdSlide(currentProdSlide + 1);
                } else {
                    showProdSlide(currentProdSlide - 1);
                }
            }
        }, { passive: true });
    }

    // ==========================================================================
    // 2. ACORDION / FAQ (Seção "Dúvidas Frequentes")
    // ==========================================================================
    const faqTriggers = document.querySelectorAll(".faq-trigger");

    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector(".faq-icon");

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                if (icon) icon.style.transform = "rotate(0deg)";
            } else {
                document.querySelectorAll(".faq-content").forEach(c => c.style.maxHeight = null);
                document.querySelectorAll(".faq-icon").forEach(i => i.style.transform = "rotate(0deg)");

                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.style.transform = "rotate(45deg)";
            }
        });
    });

    // ==========================================================================
    // 3. SCROLL SUAVE PARA LINKS — compensa navbar fixa no mobile
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? 70 : 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({ top, behavior: "smooth" });
        });
    });
});
