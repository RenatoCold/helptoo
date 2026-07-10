// ==========================================================================
// 🎯 1. ELEMENTOS DO DOM (Originais do seu print + Novos elementos)
// ==========================================================================
const menuMobile = document.getElementById('menu-mobile');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('.nav-links a');

const modalContato = document.getElementById('modal-contato');
const btnContatoNav = document.getElementById('btn-contato-nav');
const btnFecharModal = document.getElementById('fechar-modal');

// Novos elementos para a busca e o modal de detalhes dos cursos
const campoBusca = document.getElementById('campo-busca');
const cards = document.querySelectorAll('.card-curso'); 
const modalDetalhes = document.getElementById('modal-detalhes');

// ==========================================================================
// 📱 2. LÓGICA DO MENU MOBILE (100% Preservada)
// ==========================================================================

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

// ==========================================================================
// 📞 3. LÓGICA DO MODAL DE CONTATO / ORÇAMENTO (100% Preservada)
// ==========================================================================

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

// Fecha o modal clicando fora (no overlay escuro) - Atualizado para os dois modais!
window.addEventListener('click', (e) => {
    if (e.target === modalContato) {
        modalContato.classList.remove('active');
    }
    if (e.target === modalDetalhes) {
        modalDetalhes.classList.remove('active');
    }
});

// Função extra para os botões "Solicitar Orçamento" dos cards abrirem seu modal real
function abrirModalContato() {
    if (modalContato) {
        modalContato.classList.add('active');
    }
}

// ==========================================================================
// 🔍 4. BARRA DE PESQUISA (Filtro Inteligente em Tempo Real)
// ==========================================================================
if (campoBusca) {
    campoBusca.addEventListener('input', () => {
        const termo = campoBusca.value.toLowerCase().trim();
        
        cards.forEach(card => {
            const titulo = card.querySelector('h3').textContent.toLowerCase();
            const descricao = card.querySelector('p').textContent.toLowerCase();
            
            if (titulo.includes(termo) || descricao.includes(termo)) {
                card.style.display = 'flex';
                requestAnimationFrame(() => {
                    card.classList.add('com-efeito');
                });
            } else {
                card.style.display = 'none';
                card.classList.remove('com-efeito');
            }
        });
    });
}

// ==========================================================================
// 📦 5. BANCO DE DADOS LOCAL DOS CURSOS & CARROSSEL (Novo Recurso)
// ==========================================================================
const dadosCursos = {
    bls: {
        titulo: "Suporte Básico de Vida (BLS)",
        descricao: "Treinamento prático intensivo focado nas diretrizes internacionais de reanimação cardiopulmonar e desobstrução de vias aéreas (engasgo).",
        horas: "8 horas",
        publico: "Profissionais de Saúde, Socorristas e Acadêmicos",
        fotos: [
            "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
        ]
    },
    auditoria: {
        titulo: "Auditoria e Qualidade",
        descricao: "Preparando profissionais para avaliar, auditar e melhorar processos assistenciais com foco na segurança do paciente e redução de eventos adversos.",
        horas: "16 horas",
        publico: "Gestores, Enfermeiros Líderes e Administradores Hospitalares",
        fotos: [
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
        ]
    },
    emergencia: {
        titulo: "Rotinas de Emergência",
        descricao: "Capacitação teórica e prática voltada para o atendimento rápido, sistematizado e eficaz em situações críticas dentro do ambiente hospitalar e pré-hospitalar.",
        horas: "12 horas",
        publico: "Enfermeiros, Técnicos de Enfermagem e Médicos",
        fotos: [
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=800&q=80"
        ]
    },
    simulacao: {
        titulo: "Simulação Realística",
        descricao: "Treinamentos práticos avançados utilizando cenários controlados e simuladores de alta fidelidade para reproduzir com perfeição a realidade do atendimento de urgência.",
        horas: "20 horas",
        publico: "Equipes Multiprofissionais de Hospitais e Clínicas",
        fotos: [
            "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
        ]
    }
};

let fotosAtuais = [];
let indexFotoAtual = 0;

// ==========================================================================
// 🎯 5. MODAL DE DETALHES DO CURSO & CARROSSEL (VERSÃO ANTIFALHAS)
// ==========================================================================
function abrirDetalhes(idCurso) {
    console.log("Card clicado! ID do curso:", idCurso); // 👁️ Se isso aparecer no F12, o clique funcionou!

    const curso = dadosCursos[idCurso];
    if (!curso) {
        console.error("Curso não encontrado no banco de dados para o ID:", idCurso);
        return;
    }

    // Buscando os elementos direto na hora do clique para evitar erro de null
    const modalDetalhes = document.getElementById('modal-detalhes');
    const txtTitulo = document.getElementById('modal-titulo-curso');
    const txtDescricao = document.getElementById('modal-descricao-curso');
    const txtHoras = document.getElementById('modal-horas-curso');
    const txtPublico = document.getElementById('modal-publico-curso');

    if (!modalDetalhes) {
        console.error("ERRO: O HTML do modal (#modal-detalhes) não foi encontrado na página!");
        alert("O HTML do modal está faltando no final deste arquivo html!");
        return;
    }

    // Preenche os dados com segurança
    if (txtTitulo) txtTitulo.textContent = curso.titulo;
    if (txtDescricao) txtDescricao.textContent = curso.descricao;
    if (txtHoras) txtHoras.textContent = curso.horas;
    if (txtPublico) txtPublico.textContent = curso.publico;

    fotosAtuais = curso.fotos;
    indexFotoAtual = 0;
    mostrarFotoAtual();

    // Adiciona a classe que exibe a janela
    modalDetalhes.classList.add('active');
}

function fecharDetalhes() {
    const modalDetalhes = document.getElementById('modal-detalhes');
    if (modalDetalhes) {
        modalDetalhes.classList.remove('active');
    }
}

function fecharDetalhes() {
    if (modalDetalhes) {
        modalDetalhes.classList.remove('active');
    }
}

function mostrarFotoAtual() {
    const imgElement = document.getElementById('modal-img-curso');
    if (imgElement && fotosAtuais.length > 0) {
        imgElement.src = fotosAtuais[indexFotoAtual];
    }
}

function proximaFoto() {
    indexFotoAtual = (indexFotoAtual + 1) % fotosAtuais.length;
    mostrarFotoAtual();
}

function fotoAnterior() {
    indexFotoAtual = (indexFotoAtual - 1 + fotosAtuais.length) % fotosAtuais.length;
    mostrarFotoAtual();
}

// ==========================================================================
// ✨ 6. ANIMAÇÃO DE SCROLL (Intersection Observer - Final do seu arquivo)
// ==========================================================================
const elementosAnimar = document.querySelectorAll('.animar-scroll');
if (elementosAnimar.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mostrar');
            }
        });
    }, { threshold: 0.1 });

    elementosAnimar.forEach(el => observer.observe(el));
}