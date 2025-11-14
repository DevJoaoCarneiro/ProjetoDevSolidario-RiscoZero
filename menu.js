let index = 0;
const imagens = document.querySelectorAll(".carrossel-img");
const container = document.querySelector(".carrossel-container");

function atualizarCarrossel() {
    container.style.transform = `translateX(${-index * 100}%)`;
}

document.querySelector(".carrossel-btn.right").addEventListener("click", () => {
    index = (index + 1) % imagens.length;
    atualizarCarrossel();
});

document.querySelector(".carrossel-btn.left").addEventListener("click", () => {
    index = (index - 1 + imagens.length) % imagens.length;
    atualizarCarrossel();
});

const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));

