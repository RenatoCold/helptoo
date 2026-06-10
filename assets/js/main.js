// Elementos do DOM
const menuMobile = document.getElementById('menu-mobile');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('.nav-links a');

const modalContato = document.getElementById('modal-contato');
const btnContatoNav = document.getElementById('btn-contato-nav');
const btnFecharModal = document.getElementById('fechar-modal');

// Toggle do menu mobile
if (menuMobile) {
    menuMobile.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

// Fecha o menu mobile ao selecionar um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// Abre o modal de contato e previne o scroll
if (btnContatoNav) {
    btnContatoNav.addEventListener('click', (e) => {
        e.preventDefault(); 
        modalContato.classList.add('active');
        navList.classList.remove('active'); // garante que o menu mobile não fique aberto por baixo
    });
}

// Fecha o modal pelo botão X
if (btnFecharModal) {
    btnFecharModal.addEventListener('click', () => {
        modalContato.classList.remove('active');
    });
}

// Fecha o modal clicando fora (no overlay escuro)
window.addEventListener('click', (e) => {
    if (e.target === modalContato) {
        modalContato.classList.remove('active');
    }
});

// =========================================
// Animação de Scroll (Intersection Observer)
// =========================================
const elementosParaAnimar = document.querySelectorAll('.animar-scroll');

// Cria o "olheiro" que avisa quando o elemento entra na tela
const observadorDeScroll = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            // Se apareceu na tela, adiciona a classe 'mostrar'
            entrada.target.classList.add('mostrar');
            
            // Opcional: para de observar depois que animou a primeira vez (não fica repetindo)
            observadorDeScroll.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15 // A animação dispara quando 15% do elemento estiver visível
});

// Manda o observador vigiar todos os elementos que têm a classe 'animar-scroll'
elementosParaAnimar.forEach((elemento) => {
    observadorDeScroll.observe(elemento);
});