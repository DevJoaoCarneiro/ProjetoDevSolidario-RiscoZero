function initCarrossel(wrapperSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    if (!wrapper) return;

    const container = wrapper.querySelector(".carrossel-container");
    const imagens = wrapper.querySelectorAll(".carrossel-img");
    let index = 0;

    function atualizarCarrossel() {
        if (!container) return;
        container.style.transform = `translateX(${-index * 100}%)`;
    }

    const botaoDireita = wrapper.querySelector(".carrossel-btn.right");
    const botaoEsquerda = wrapper.querySelector(".carrossel-btn.left");

    botaoDireita?.addEventListener("click", () => {
        if (imagens.length === 0) return;
        index = (index + 1) % imagens.length;
        atualizarCarrossel();
    });

    botaoEsquerda?.addEventListener("click", () => {
        if (imagens.length === 0) return;
        index = (index - 1 + imagens.length) % imagens.length;
        atualizarCarrossel();
    });
}


initCarrossel(".carrossel_desktop");
initCarrossel(".carrossel_mobile");


const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

document
    .querySelectorAll(".scroll-reveal")
    .forEach((el) => observer.observe(el));


function centralizarCarrossel(containerId, cardSelector) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn("Container não encontrado:", containerId);
        return;
    }

    const cards = container.querySelectorAll(cardSelector);
    if (cards.length === 0) {
        console.warn("Nenhum card encontrado em:", containerId);
        return;
    }

    const middleIndex = Math.floor(cards.length / 2);
    const targetCard = cards[middleIndex];

    const containerRect = container.getBoundingClientRect();
    const cardRect = targetCard.getBoundingClientRect();

    const offsetInside = cardRect.left - containerRect.left;
    const currentScroll = container.scrollLeft;

    const scrollTo =
        currentScroll +
        offsetInside -
        (containerRect.width / 2 - cardRect.width / 2);

    container.scrollTo({
        left: scrollTo,
        behavior: "auto",
    });
}

window.addEventListener("load", () => {
    if (window.matchMedia("(max-width: 480px)").matches) {
        centralizarCarrossel("carrossel_servicos", ".card_servico");
        centralizarCarrossel("carrossel_porque", ".porque_card");
        centralizarCarrossel("carrossel_clientes", ".cliente_card");
    }
});
