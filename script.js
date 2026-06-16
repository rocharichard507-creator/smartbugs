document.addEventListener("DOMContentLoaded", function () {


    /* ==========================================================================
       CARROSSEL DE PRODUTOS
       Controla os slides, setas de navegação e bolinhas indicadoras
       ========================================================================== */

    const slides    = document.querySelectorAll(".carousel-slide");
    const dots      = document.querySelectorAll(".dot");
    const prevBtn   = document.querySelector(".prev-btn");
    const nextBtn   = document.querySelector(".next-btn");

    let currentSlide  = 0;
    let slideInterval;

    /* Mostra o slide pelo índice informado */
    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0)         currentSlide = slides.length - 1;
        else                        currentSlide = index;

        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot   => dot.classList.remove("active"));

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    /* Reinicia o timer automático ao interagir manualmente */
    function startInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3500);
    }

    /* Clique nas setas */
    nextBtn.addEventListener("click", () => { nextSlide(); startInterval(); });
    prevBtn.addEventListener("click", () => { prevSlide(); startInterval(); });

    /* Clique nas bolinhas */
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => { showSlide(index); startInterval(); });
    });

    /* Inicia automaticamente */
    startInterval();


    /* ==========================================================================
       FAQ / ACCORDION
       Abre e fecha as perguntas com efeito sanfona (um por vez)
       ========================================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const trigger = item.querySelector(".faq-trigger");

        trigger.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");

            /* Fecha todos os itens abertos */
            faqItems.forEach(otherItem => otherItem.classList.remove("active"));

            /* Se estava fechado, abre agora */
            if (!isOpen) item.classList.add("active");
        });
    });


    /* ==========================================================================
       SCROLL SUAVE (NAVEGAÇÃO INTERNA)
       Aplica rolagem suave em todos os links âncora do menu e botões
       ========================================================================== */

    const internalLinks = document.querySelectorAll('nav a[href^="#"], .btn-saiba-mais[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetSelector = this.getAttribute("href");

            /* Ignora links que não apontam para um elemento da página */
            if (!targetSelector || targetSelector === "#") return;

            const targetEl = document.querySelector(targetSelector);
            if (!targetEl) return;

            e.preventDefault();

            window.scrollTo({
                top: targetEl.offsetTop - 20, /* Pequeno respiro acima da seção */
                behavior: "smooth"
            });
        });
    });


}); /* fim DOMContentLoaded */