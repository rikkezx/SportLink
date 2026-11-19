// =====================================================
// SPORTLINK - JAVASCRIPT BÁSICO (compartilhado pelas 5 páginas)
// Cada bloco só funciona se os elementos existirem na página.
// =====================================================


// ---------- MENU DO CELULAR ----------
let botaoMenu = document.getElementById("botaoMenu");
let menuNavegacao = document.getElementById("menuNavegacao");

if (botaoMenu && menuNavegacao) {
    botaoMenu.addEventListener("click", function () {
        menuNavegacao.classList.toggle("aberto");
    });
}


// ---------- CONECTAR PESSOAS (Explorar e Perfil) ----------
// Todos os botões com a classe "botao-conectar" funcionam assim:
// 1º clique = "Conectado", 2º clique = volta para "Conectar"
let botoesConectar = document.querySelectorAll(".botao-conectar");

function conectar(botao) {
    if (botao.textContent === "Conectar") {
        botao.textContent = "Conectado";
        botao.classList.add("ativado");
    } else {
        botao.textContent = "Conectar";
        botao.classList.remove("ativado");
    }
}

botoesConectar.forEach(function (botao) {
    botao.addEventListener("click", function () {
        conectar(botao);
    });
});


// ---------- PESQUISA DE ATLETAS E FILTROS DE CATEGORIAS (Explorar) ----------
let campoBuscaPessoas = document.getElementById("buscaPessoas");
let categoriaPessoas = "todos"; // categoria escolhida no momento

function filtrarPessoas() {
    let texto = campoBuscaPessoas.value.toLowerCase();
    let cards = document.querySelectorAll(".card-pessoa");
    let quantidadeVisivel = 0;

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let tipo = card.getAttribute("data-tipo");
        let conteudo = card.textContent.toLowerCase();

        // O card aparece se combinar com a categoria E com o texto digitado
        let combinaCategoria = (categoriaPessoas === "todos" || tipo === categoriaPessoas);
        let combinaTexto = conteudo.includes(texto);

        if (combinaCategoria && combinaTexto) {
            card.classList.remove("escondido");
            quantidadeVisivel = quantidadeVisivel + 1;
        } else {
            card.classList.add("escondido");
        }
    }

    // Mostra uma mensagem se nenhum card aparecer
    let mensagem = document.getElementById("mensagemVazia");
    if (mensagem) {
        if (quantidadeVisivel === 0) {
            mensagem.classList.remove("escondido");
        } else {
            mensagem.classList.add("escondido");
        }
    }
}

if (campoBuscaPessoas) {
    campoBuscaPessoas.addEventListener("input", filtrarPessoas);

    let filtrosPessoas = document.querySelectorAll(".filtro-pessoa");
    filtrosPessoas.forEach(function (filtro) {
        filtro.addEventListener("click", function () {
            // tira o destaque de todos os botões e destaca só o clicado
            filtrosPessoas.forEach(function (outro) {
                outro.classList.remove("ativo");
            });
            filtro.classList.add("ativo");

            categoriaPessoas = filtro.getAttribute("data-filtro");
            filtrarPessoas();
        });
    });
}


// ---------- CRIAR PUBLICAÇÕES (Feed) ----------
function publicar() {
    let campo = document.getElementById("textoNovaPublicacao");
    let texto = campo.value.trim();

    // impede publicação vazia
    if (texto === "") {
        alert("Escreva algo antes de publicar.");
        return;
    }

    let novaPublicacao = document.createElement("article");
    novaPublicacao.className = "card publicacao";
    novaPublicacao.innerHTML =
        '<div class="publicacao-topo">' +
        '<div class="avatar avatar-pequeno">VC</div>' +
        '<div><strong>Você</strong><span class="legenda">Comunidade SportLink · agora</span></div>' +
        '</div>' +
        '<p class="texto-publicacao"></p>' +
        '<p class="contagem legenda"><span class="numero-curtidas">0</span> curtidas · <span class="numero-comentarios">0</span> comentários</p>' +
        '<div class="acoes-publicacao">' +
        '<button class="botao-acao" onclick="curtir(this)">👍 Curtir</button>' +
        '<button class="botao-acao" onclick="comentar(this)">💬 Comentar</button>' +
        '<button class="botao-acao" onclick="compartilhar()">↗ Compartilhar</button>' +
        '</div>' +
        '<div class="lista-comentarios"></div>';

    // textContent evita que o texto digitado seja lido como HTML
    novaPublicacao.querySelector(".texto-publicacao").textContent = texto;

    let lista = document.getElementById("listaPublicacoes");
    lista.insertBefore(novaPublicacao, lista.firstChild);

    campo.value = "";
}

let botaoPublicar = document.getElementById("botaoPublicar");
if (botaoPublicar) {
    botaoPublicar.addEventListener("click", publicar);
}


// ---------- CURTIR PUBLICAÇÕES (Feed) ----------
function curtir(botao) {
    let publicacao = botao.closest(".publicacao");
    let numero = publicacao.querySelector(".numero-curtidas");
    let total = Number(numero.textContent);

    if (botao.classList.contains("curtido")) {
        // já estava curtido: remove a curtida
        botao.classList.remove("curtido");
        botao.textContent = "👍 Curtir";
        total = total - 1;
    } else {
        // ainda não estava curtido: adiciona a curtida
        botao.classList.add("curtido");
        botao.textContent = "👍 Curtido";
        total = total + 1;
    }

    numero.textContent = total;
}


// ---------- COMENTAR PUBLICAÇÕES (Feed) ----------
function comentar(botao) {
    let texto = prompt("Digite seu comentário:");

    // null = o usuário clicou em Cancelar
    if (texto === null) {
        return;
    }

    texto = texto.trim();
    if (texto === "") {
        alert("O comentário não pode ficar vazio.");
        return;
    }

    let publicacao = botao.closest(".publicacao");
    let listaComentarios = publicacao.querySelector(".lista-comentarios");

    let novoComentario = document.createElement("div");
    novoComentario.className = "comentario";
    novoComentario.innerHTML = "<strong>Você:</strong> <span></span>";
    novoComentario.querySelector("span").textContent = texto;
    listaComentarios.appendChild(novoComentario);

    // atualiza o número de comentários
    let numero = publicacao.querySelector(".numero-comentarios");
    numero.textContent = Number(numero.textContent) + 1;
}


// ---------- COMPARTILHAR PUBLICAÇÕES (Feed) ----------
function compartilhar() {
    alert("Publicação compartilhada com sucesso! (demonstração)");
}


// ---------- EDITAR DESCRIÇÃO DO PERFIL (Perfil) ----------
function editarDescricao() {
    let descricao = document.getElementById("descricaoPerfil");
    let novoTexto = prompt("Digite a nova descrição do perfil:", descricao.textContent);

    if (novoTexto === null) {
        return;
    }

    novoTexto = novoTexto.trim();
    if (novoTexto === "") {
        alert("A descrição não pode ficar vazia.");
        return;
    }

    descricao.textContent = novoTexto;

    // a seção "Sobre mim" também mostra o texto
    let sobre = document.getElementById("textoSobre");
    if (sobre) {
        sobre.textContent = novoTexto;
    }
}

let botaoEditar = document.getElementById("botaoEditar");
if (botaoEditar) {
    botaoEditar.addEventListener("click", editarDescricao);
}

let botaoMensagem = document.getElementById("botaoMensagem");
if (botaoMensagem) {
    botaoMensagem.addEventListener("click", function () {
        alert("A funcionalidade de mensagens é demonstrativa neste projeto.");
    });
}


// ---------- FILTRAR OPORTUNIDADES (Oportunidades) ----------
let campoBuscaOportunidades = document.getElementById("buscaOportunidades");
let categoriaOportunidades = "todas";

function filtrarOportunidades() {
    let texto = campoBuscaOportunidades.value.toLowerCase();
    let cards = document.querySelectorAll(".card-oportunidade");
    let quantidadeVisivel = 0;

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let categoria = card.getAttribute("data-categoria");
        let conteudo = card.textContent.toLowerCase();

        let combinaCategoria = (categoriaOportunidades === "todas" || categoria === categoriaOportunidades);
        let combinaTexto = conteudo.includes(texto);

        if (combinaCategoria && combinaTexto) {
            card.classList.remove("escondido");
            quantidadeVisivel = quantidadeVisivel + 1;
        } else {
            card.classList.add("escondido");
        }
    }

    let mensagem = document.getElementById("mensagemVaziaOportunidades");
    if (mensagem) {
        if (quantidadeVisivel === 0) {
            mensagem.classList.remove("escondido");
        } else {
            mensagem.classList.add("escondido");
        }
    }
}

if (campoBuscaOportunidades) {
    campoBuscaOportunidades.addEventListener("input", filtrarOportunidades);

    let filtrosOportunidades = document.querySelectorAll(".filtro-oportunidade");
    filtrosOportunidades.forEach(function (filtro) {
        filtro.addEventListener("click", function () {
            filtrosOportunidades.forEach(function (outro) {
                outro.classList.remove("ativo");
            });
            filtro.classList.add("ativo");

            categoriaOportunidades = filtro.getAttribute("data-filtro");
            filtrarOportunidades();
        });
    });
}


// ---------- DEMONSTRAR INTERESSE EM OPORTUNIDADES ----------
let botoesInteresse = document.querySelectorAll(".botao-interesse");

function demonstrarInteresse(botao) {
    if (botao.textContent === "Tenho interesse") {
        botao.textContent = "Interesse demonstrado";
        botao.classList.add("ativado");
    } else {
        botao.textContent = "Tenho interesse";
        botao.classList.remove("ativado");
    }
}

botoesInteresse.forEach(function (botao) {
    botao.addEventListener("click", function () {
        demonstrarInteresse(botao);
    });
});


// ---------- VER DETALHES DA OPORTUNIDADE ----------
// Os detalhes ficam guardados no atributo data-detalhes de cada card
let botoesDetalhes = document.querySelectorAll(".botao-detalhes");

botoesDetalhes.forEach(function (botao) {
    botao.addEventListener("click", function () {
        let card = botao.closest(".card-oportunidade");
        let nome = card.querySelector("h3").textContent;
        let detalhes = card.getAttribute("data-detalhes");
        alert(nome + "\n\n" + detalhes + "\n\n(Oportunidade fictícia, apenas para demonstração.)");
    });
});


// =====================================================
// DARK MODE (tema claro / tema escuro)
// A escolha fica salva no localStorage com a chave "tema".
// =====================================================

// Aplica o tema no <html> usando o atributo data-theme
function aplicarTema(tema) {
    if (tema === "escuro") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }
}

// Troca de claro para escuro (e vice-versa) e salva a escolha
function alternarTema() {
    let temaAtual = localStorage.getItem("tema");

    if (temaAtual === "escuro") {
        localStorage.setItem("tema", "claro");
        aplicarTema("claro");
    } else {
        localStorage.setItem("tema", "escuro");
        aplicarTema("escuro");
    }
}

// Ao abrir a página: o tema claro é o padrão
let temaSalvo = localStorage.getItem("tema");
if (temaSalvo === null) {
    temaSalvo = "claro";
}
aplicarTema(temaSalvo);

let botaoTema = document.getElementById("botaoTema");
if (botaoTema) {
    botaoTema.addEventListener("click", alternarTema);
}


// =====================================================
// LOGIN E CADASTRO (modal que aparece em todas as páginas)
//
// ATENÇÃO: esta autenticação é apenas ACADÊMICA e demonstrativa.
// Ela NÃO é segura. Em um SportLink de verdade seria preciso ter
// backend, banco de dados e senhas protegidas (criptografadas).
//
// - As contas ficam em um array na memória (somem ao recarregar a página).
// - O localStorage guarda só nome, e-mail, tipo de perfil e id do perfil.
//   A senha NUNCA é salva no localStorage.
// =====================================================

// Contas de demonstração (definidas no código)
let contas = [
    { nome: "Lucas Ferreira", email: "atleta@sportlink.com", senha: "sport123", tipo: "Atleta", idPerfil: "lucas" },
    { nome: "Guilherme", email: "guilherme867@gmail.com", senha: "1234567", tipo: "Atleta", idPerfil: "guilherme" }
];

let modoJanela = "entrar"; // "entrar" ou "cadastro"

// ---------- Monta a janela (modal) e coloca no final do body ----------
function criarModalLogin() {
    let fundo = document.createElement("div");
    fundo.id = "fundoModal";
    fundo.className = "fundo-modal escondido";
    fundo.innerHTML =
        '<div class="modal">' +
        '<button class="modal-fechar" id="botaoFecharModal" type="button" aria-label="Fechar">✕</button>' +
        '<h2 id="tituloModal">Bem-vindo de volta!</h2>' +
        '<p class="modal-subtitulo" id="subtituloModal">Entre na sua conta SportLink.</p>' +
        '<form id="formularioConta" novalidate>' +
        '<div id="caixaNome" class="escondido">' +
        '<label for="campoNome">Nome completo</label>' +
        '<input type="text" id="campoNome" class="campo-texto" placeholder="Seu nome completo">' +
        '</div>' +
        '<label for="campoEmail">E-mail</label>' +
        '<input type="email" id="campoEmail" class="campo-texto" placeholder="seuemail@exemplo.com">' +
        '<label for="campoSenha">Senha</label>' +
        '<input type="password" id="campoSenha" class="campo-texto" placeholder="Sua senha">' +
        '<div id="caixaCadastro" class="escondido">' +
        '<label for="campoConfirmar">Confirmar senha</label>' +
        '<input type="password" id="campoConfirmar" class="campo-texto" placeholder="Repita a senha">' +
        '<label for="campoTipo">Tipo de perfil</label>' +
        '<select id="campoTipo" class="campo-texto">' +
        '<option value="">Escolha uma opção</option>' +
        '<option value="Atleta">Atleta</option>' +
        '<option value="Técnico">Técnico</option>' +
        '<option value="Olheiro">Olheiro</option>' +
        '<option value="Clube">Clube</option>' +
        '</select>' +
        '</div>' +
        '<p class="mensagem-erro escondido" id="mensagemErro"></p>' +
        '<p class="mensagem-sucesso escondido" id="mensagemSucesso"></p>' +
        '<button type="submit" class="botao" id="botaoEnviarConta">Entrar</button>' +
        '</form>' +
        '<p class="link-alternar" id="linkAlternar"></p>' +
        '<p class="aviso-academico" id="avisoAcademico">Autenticação acadêmica e demonstrativa, sem a segurança de um sistema real. ' +
        'Conta de teste: atleta@sportlink.com / sport123.</p>' +
        '</div>';
    document.body.appendChild(fundo);
}

// ---------- Abrir, fechar e alternar entre login e cadastro ----------
function abrirModal(modo) {
    mudarModo(modo);
    document.getElementById("fundoModal").classList.remove("escondido");
}

function fecharModal() {
    document.getElementById("fundoModal").classList.add("escondido");
    document.getElementById("formularioConta").reset();
    limparMensagens();
}

function limparMensagens() {
    document.getElementById("mensagemErro").classList.add("escondido");
    document.getElementById("mensagemSucesso").classList.add("escondido");
}

function mudarModo(modo) {
    modoJanela = modo;
    limparMensagens();

    let linkAlternar = document.getElementById("linkAlternar");

    if (modo === "entrar") {
        document.getElementById("tituloModal").textContent = "Bem-vindo de volta!";
        document.getElementById("subtituloModal").textContent = "Entre na sua conta SportLink.";
        document.getElementById("caixaNome").classList.add("escondido");
        document.getElementById("caixaCadastro").classList.add("escondido");
        document.getElementById("botaoEnviarConta").textContent = "Entrar";
        linkAlternar.innerHTML = 'Ainda não tem uma conta? <button type="button" id="botaoAlternar">Criar conta.</button>';
    } else {
        document.getElementById("tituloModal").textContent = "Crie sua conta";
        document.getElementById("subtituloModal").textContent = "Junte-se à comunidade SportLink.";
        document.getElementById("caixaNome").classList.remove("escondido");
        document.getElementById("caixaCadastro").classList.remove("escondido");
        document.getElementById("botaoEnviarConta").textContent = "Criar conta";
        linkAlternar.innerHTML = 'Já tem uma conta? <button type="button" id="botaoAlternar">Entrar.</button>';
    }

    // o botão acima foi recriado, então ligamos o clique de novo
    document.getElementById("botaoAlternar").addEventListener("click", function () {
        if (modoJanela === "entrar") {
            mudarModo("cadastro");
        } else {
            mudarModo("entrar");
        }
    });
}

function mostrarErro(texto) {
    let mensagem = document.getElementById("mensagemErro");
    document.getElementById("mensagemSucesso").classList.add("escondido");
    mensagem.textContent = texto;
    mensagem.classList.remove("escondido");
}

function mostrarSucesso(texto) {
    let mensagem = document.getElementById("mensagemSucesso");
    document.getElementById("mensagemErro").classList.add("escondido");
    mensagem.textContent = texto;
    mensagem.classList.remove("escondido");
}

// ---------- Validação ----------
// Verifica se o e-mail tem um formato simples: texto@texto.texto
function emailValido(email) {
    let arroba = email.indexOf("@");
    let ponto = email.lastIndexOf(".");

    if (arroba < 1) {
        return false;
    }
    if (ponto < arroba + 2) {
        return false;
    }
    if (ponto === email.length - 1) {
        return false;
    }
    if (email.indexOf(" ") !== -1) {
        return false;
    }
    return true;
}

// Procura uma conta pelo e-mail (retorna a conta ou null)
function buscarConta(email) {
    for (let i = 0; i < contas.length; i++) {
        if (contas[i].email === email) {
            return contas[i];
        }
    }
    return null;
}

// ---------- Login ----------
function fazerLogin() {
    let email = document.getElementById("campoEmail").value.trim().toLowerCase();
    let senha = document.getElementById("campoSenha").value;

    if (email === "" || senha === "") {
        mostrarErro("Preencha o e-mail e a senha para entrar.");
        return;
    }

    if (!emailValido(email)) {
        mostrarErro("Digite um e-mail válido, como nome@exemplo.com.");
        return;
    }

    let conta = buscarConta(email);

    if (conta === null || conta.senha !== senha) {
        mostrarErro("E-mail ou senha incorretos. Confira os dados e tente novamente.");
        return;
    }

    // login correto: guardamos só dados simples (sem senha!)
    localStorage.setItem("usuarioNome", conta.nome);
    localStorage.setItem("usuarioEmail", conta.email);
    localStorage.setItem("usuarioTipo", conta.tipo);
    localStorage.setItem("usuarioPerfil", conta.idPerfil);

    mostrarSucesso("Login realizado com sucesso! Bem-vindo(a), " + conta.nome + ".");
    atualizarCabecalho();

    // espera um instante para o usuário ler a mensagem e fecha a janela
    setTimeout(fecharModal, 900);
}

// ---------- Cadastro ----------
function fazerCadastro() {
    let nome = document.getElementById("campoNome").value.trim();
    let email = document.getElementById("campoEmail").value.trim().toLowerCase();
    let senha = document.getElementById("campoSenha").value;
    let confirmar = document.getElementById("campoConfirmar").value;
    let tipo = document.getElementById("campoTipo").value;

    if (nome === "" || email === "" || senha === "" || confirmar === "" || tipo === "") {
        mostrarErro("Preencha todos os campos para criar a conta.");
        return;
    }

    if (!emailValido(email)) {
        mostrarErro("Digite um e-mail válido, como nome@exemplo.com.");
        return;
    }

    if (senha !== confirmar) {
        mostrarErro("A senha e a confirmação precisam ser iguais.");
        return;
    }

    if (buscarConta(email) !== null) {
        mostrarErro("Este e-mail já está sendo usado na demonstração.");
        return;
    }

    // guarda a nova conta apenas na memória (array "contas")
    contas.push({ nome: nome, email: email, senha: senha, tipo: tipo, idPerfil: "meu" });

    // volta para o login com o e-mail já preenchido
    mudarModo("entrar");
    document.getElementById("campoEmail").value = email;
    document.getElementById("campoSenha").value = "";
    mostrarSucesso("Conta criada com sucesso! Agora é só entrar.");
}

// Decide se o formulário é de login ou de cadastro
function enviarFormulario(evento) {
    evento.preventDefault(); // impede a página de recarregar

    if (modoJanela === "entrar") {
        fazerLogin();
    } else {
        fazerCadastro();
    }
}

// ---------- Logout ----------
function sair() {
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("usuarioTipo");
    localStorage.removeItem("usuarioPerfil");
    atualizarCabecalho();
}

// ---------- Atualização do cabeçalho ----------
// Mostra "Entrar" ou o nome e o tipo do usuário com o botão Sair
function atualizarCabecalho() {
    let nomeLogado = localStorage.getItem("usuarioNome");
    let botaoEntrar = document.getElementById("botaoEntrar");
    let areaUsuario = document.getElementById("areaUsuario");

    if (nomeLogado !== null) {
        botaoEntrar.classList.add("escondido");
        areaUsuario.classList.remove("escondido");
        document.getElementById("nomeUsuario").textContent = nomeLogado;
        document.getElementById("tipoUsuario").textContent = localStorage.getItem("usuarioTipo");
    } else {
        botaoEntrar.classList.remove("escondido");
        areaUsuario.classList.add("escondido");
    }

    atualizarLinksPerfil();
}

// Os links "Meu perfil" levam ao perfil do usuário conectado
function atualizarLinksPerfil() {
    let idPerfil = localStorage.getItem("usuarioPerfil");
    let destino = "perfil.html";

    if (idPerfil !== null) {
        destino = "perfil.html?id=" + idPerfil;
    }

    let linkUsuario = document.getElementById("linkUsuario");
    if (linkUsuario) {
        linkUsuario.setAttribute("href", destino);
    }

    let linksMeuPerfil = document.querySelectorAll(".link-meu-perfil");
    linksMeuPerfil.forEach(function (link) {
        link.setAttribute("href", destino);
    });
}

// ---------- Liga os eventos (todas as páginas têm o cabeçalho) ----------
if (document.getElementById("botaoEntrar")) {
    criarModalLogin();
    mudarModo("entrar");

    document.getElementById("botaoEntrar").addEventListener("click", function () {
        abrirModal("entrar");
    });
    document.getElementById("botaoSair").addEventListener("click", sair);
    document.getElementById("botaoFecharModal").addEventListener("click", fecharModal);
    document.getElementById("formularioConta").addEventListener("submit", enviarFormulario);

    // clicar no fundo escuro (fora da janela) também fecha
    document.getElementById("fundoModal").addEventListener("click", function (evento) {
        if (evento.target.id === "fundoModal") {
            fecharModal();
        }
    });

    // tecla Esc fecha a janela
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            fecharModal();
        }
    });

    atualizarCabecalho();
}

// Links "Meu perfil": se não estiver logado, abre a janela de login
let linksMeuPerfil = document.querySelectorAll(".link-meu-perfil");

linksMeuPerfil.forEach(function (link) {
    link.addEventListener("click", function (evento) {
        if (localStorage.getItem("usuarioNome") === null) {
            evento.preventDefault();
            abrirModal("entrar");
        }
    });
});


// =====================================================
// PERFIS (perfil.html?id=lucas, perfil.html?id=mariana, ...)
// Todos os perfis ficam neste objeto. A página lê o "id" do endereço
// e preenche os campos com os dados do perfil escolhido.
// =====================================================

const perfis = {
    lucas: {
        iniciais: "LF", nome: "Lucas Ferreira", etiqueta: "Atleta",
        modalidade: "Futebol", posicao: "Atacante", idade: 18, cidade: "Santos-SP",
        descricao: "Atleta em formação, dedicado à evolução técnica e física, buscando novas oportunidades para crescer no futebol.",
        seguidores: "1.280", conexoes: "342", conquistasTotal: "8",
        capa: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
        midia: ["photo-1431324155629-1a6deb1dec8d", "photo-1517836357463-d25dfeac3438", "photo-1574629810360-7efbbe195018"],
        info: [["Modalidade", "Futebol"], ["Posição", "Atacante"], ["Pé dominante", "Direito"], ["Altura", "1,78 m"], ["Peso", "70 kg"]],
        experiencia: [["Escolinha Litoral FC", "2018 - 2021 · Categorias de base"], ["Time Sub-17 Santos Jovem", "2022 - 2023"], ["Time Sub-20 Praia Clube", "2024 - atual"]],
        estatisticas: [["32", "Jogos"], ["18", "Gols"], ["9", "Assistências"], ["4", "Títulos"]],
        conquistas: ["🏆 Campeão do Torneio Regional Sub-17", "🥇 Artilheiro do campeonato escolar", "⭐ Melhor jogador da final municipal"],
        publicacoes: [["Treino de finalização concluído! Foco total na próxima peneira.", "há 3 dias"], ["Obrigado ao time pelo apoio na final de domingo.", "há 1 semana"]]
    },
    mariana: {
        iniciais: "MC", nome: "Mariana Costa", etiqueta: "Atleta",
        modalidade: "Vôlei", posicao: "Levantadora", idade: 20, cidade: "São Paulo-SP",
        descricao: "Levantadora com foco em estratégia de jogo e liderança em quadra, em busca de uma equipe para competir em nível estadual.",
        seguidores: "2.150", conexoes: "410", conquistasTotal: "6",
        capa: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200&q=80",
        midia: ["photo-1612872087720-bb876e2e67d1", "photo-1517836357463-d25dfeac3438", "photo-1552674605-db6ffd4facb5"],
        info: [["Modalidade", "Vôlei"], ["Posição", "Levantadora"], ["Mão dominante", "Direita"], ["Altura", "1,76 m"], ["Categoria", "Adulto"]],
        experiencia: [["Colégio Santa Clara", "2017 - 2020 · Equipe escolar"], ["Vôlei Paulista Sub-18", "2021 - 2022"], ["Clube Metropolitano", "2023 - atual"]],
        estatisticas: [["45", "Jogos"], ["210", "Assistências"], ["38", "Aces de saque"], ["3", "Títulos"]],
        conquistas: ["🥇 Campeã dos Jogos Escolares", "🏆 Vice-campeã estadual Sub-18", "⭐ Melhor levantadora do torneio regional"],
        publicacoes: [["Treino de hoje focado em saque e levantamento. Cada semana sinto minha evolução!", "há 5 horas"], ["Que jogo incrível no sábado! Vamos em frente.", "há 4 dias"]]
    },
    rafael: {
        iniciais: "RL", nome: "Rafael Lima", etiqueta: "Atleta",
        modalidade: "Basquete", posicao: "Armador", idade: 19, cidade: "Campinas-SP",
        descricao: "Armador com boa visão de jogo e muita dedicação aos treinos, sonhando em jogar em uma liga profissional.",
        seguidores: "1.640", conexoes: "288", conquistasTotal: "5",
        capa: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80",
        midia: ["photo-1546519638-68e109498ffc", "photo-1517836357463-d25dfeac3438", "photo-1552674605-db6ffd4facb5"],
        info: [["Modalidade", "Basquete"], ["Posição", "Armador"], ["Mão dominante", "Direita"], ["Altura", "1,85 m"], ["Peso", "78 kg"]],
        experiencia: [["Escola Esportiva Campinas", "2019 - 2021 · Iniciação"], ["Campinas Basketball Sub-17", "2022 - 2023"], ["Campinas Basketball Sub-19", "2024 - atual"]],
        estatisticas: [["28", "Jogos"], ["14", "Pontos por jogo"], ["6", "Assistências por jogo"], ["2", "Medalhas"]],
        conquistas: ["🥈 Medalha de prata no torneio regional", "🏆 Campeão da copa escolar", "⭐ Cestinha da temporada Sub-17"],
        publicacoes: [["Conquistamos a prata no torneio regional! Muito orgulho da equipe.", "há 2 horas"], ["Treino de arremesso de três pontos concluído.", "há 6 dias"]]
    },
    beatriz: {
        iniciais: "BN", nome: "Beatriz Nogueira", etiqueta: "Atleta",
        modalidade: "Natação", posicao: "Nado livre", idade: 17, cidade: "Guarujá-SP",
        descricao: "Nadadora de provas de velocidade, treina seis vezes por semana e busca evoluir seus tempos em competições estaduais.",
        seguidores: "980", conexoes: "220", conquistasTotal: "7",
        capa: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80",
        midia: ["photo-1530549387789-4c1017266635", "photo-1517836357463-d25dfeac3438", "photo-1552674605-db6ffd4facb5"],
        info: [["Modalidade", "Natação"], ["Provas", "50 m e 100 m livre"], ["Treinos", "6 vezes por semana"], ["Altura", "1,70 m"], ["Categoria", "Juvenil"]],
        experiencia: [["Escolinha Aquática Guarujá", "2016 - 2019"], ["Clube Aquático Maré", "2020 - 2022 · Equipe de base"], ["Equipe Juvenil Litoral", "2023 - atual"]],
        estatisticas: [["28s", "Melhor 50 m livre"], ["1min03s", "Melhor 100 m livre"], ["12", "Competições"], ["7", "Medalhas"]],
        conquistas: ["🥇 Ouro nos 50 m livre do torneio regional", "🥈 Prata no revezamento 4x100 m", "⭐ Melhor evolução de tempo do ano"],
        publicacoes: [["Treino de manhã concluído: 4 km na piscina!", "há 1 dia"], ["Novo recorde pessoal nos 50 m livre.", "há 1 semana"]]
    },
    carlos: {
        iniciais: "CM", nome: "Carlos Mendes", etiqueta: "Técnico",
        modalidade: "Futebol", posicao: "Categorias de base", idade: 0, cidade: "Santos-SP",
        descricao: "Técnico com 10 anos de experiência na formação de jovens atletas, com foco em disciplina, técnica e desenvolvimento pessoal.",
        seguidores: "3.200", conexoes: "760", conquistasTotal: "12",
        capa: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=80",
        midia: ["photo-1431324155629-1a6deb1dec8d", "photo-1574629810360-7efbbe195018", "photo-1517836357463-d25dfeac3438"],
        info: [["Modalidade", "Futebol"], ["Função", "Técnico de base"], ["Experiência", "10 anos"], ["Formação", "Educação Física"], ["Categorias", "Sub-15 a Sub-20"]],
        experiencia: [["Escolinha Litoral FC", "2016 - 2019 · Auxiliar técnico"], ["Santos Jovem", "2020 - 2023 · Técnico Sub-17"], ["Elite Sports Academy", "2024 - atual · Técnico Sub-20"]],
        estatisticas: [["10", "Anos de carreira"], ["120", "Atletas treinados"], ["6", "Títulos de base"], ["9", "Atletas em clubes"]],
        conquistas: ["🏆 Campeão regional Sub-17", "🥇 Melhor técnico da copa da juventude", "⭐ 9 atletas encaminhados para clubes"],
        publicacoes: [["Atenção, jovens atletas! Estamos organizando uma avaliação esportiva neste mês.", "ontem"], ["Parabéns à equipe pela vitória no fim de semana!", "há 5 dias"]]
    },
    ricardo: {
        iniciais: "RA", nome: "Ricardo Alves", etiqueta: "Técnico",
        modalidade: "Vôlei", posicao: "Treinador", idade: 0, cidade: "São Paulo-SP",
        descricao: "Treinador de vôlei com foco em desenvolvimento técnico e trabalho em equipe, atuando com jovens de 14 a 19 anos.",
        seguidores: "1.870", conexoes: "530", conquistasTotal: "9",
        capa: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200&q=80",
        midia: ["photo-1612872087720-bb876e2e67d1", "photo-1517836357463-d25dfeac3438", "photo-1552674605-db6ffd4facb5"],
        info: [["Modalidade", "Vôlei"], ["Função", "Treinador"], ["Experiência", "8 anos"], ["Formação", "Educação Física"], ["Categorias", "Sub-15 a Sub-19"]],
        experiencia: [["Colégio Santa Clara", "2018 - 2020 · Auxiliar técnico"], ["Vôlei Paulista", "2021 - 2023 · Técnico Sub-17"], ["Clube Metropolitano", "2024 - atual · Treinador"]],
        estatisticas: [["8", "Anos de carreira"], ["90", "Atletas treinados"], ["5", "Títulos"], ["12", "Bolsas conquistadas"]],
        conquistas: ["🏆 Campeão estadual Sub-17", "🥈 Vice-campeão dos Jogos Escolares", "⭐ 12 atletas com bolsa esportiva"],
        publicacoes: [["Planejamento da temporada pronto. Vem aí muita evolução!", "há 2 dias"], ["Clínica de saque e recepção neste sábado.", "há 1 semana"]]
    },
    ana: {
        iniciais: "AS", nome: "Ana Souza", etiqueta: "Olheira",
        modalidade: "Modalidades diversas", posicao: "", idade: 0, cidade: "São Paulo-SP",
        descricao: "Olheira que acompanha competições escolares e regionais em busca de novos talentos de diferentes modalidades.",
        seguidores: "2.640", conexoes: "890", conquistasTotal: "10",
        capa: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
        midia: ["photo-1461896836934-ffe607ba8211", "photo-1574629810360-7efbbe195018", "photo-1546519638-68e109498ffc"],
        info: [["Função", "Olheira esportiva"], ["Modalidades", "Futebol, vôlei, basquete e atletismo"], ["Região", "Estado de São Paulo"], ["Experiência", "7 anos"], ["Faixa etária", "13 a 20 anos"]],
        experiencia: [["Liga Escolar Paulista", "2019 - 2021 · Observadora"], ["Elite Sports Academy", "2022 - 2023 · Analista de talentos"], ["Atuação independente", "2024 - atual"]],
        estatisticas: [["7", "Anos de experiência"], ["300", "Atletas observados"], ["35", "Atletas indicados"], ["18", "Competições visitadas"]],
        conquistas: ["⭐ 35 atletas indicados para avaliações", "🏆 Reconhecimento da liga escolar", "🤝 Parceria com 6 clubes de formação"],
        publicacoes: [["Ótimos talentos no torneio escolar deste fim de semana!", "há 3 dias"], ["Dica: mantenha seu perfil atualizado com vídeos dos seus jogos.", "há 1 semana"]]
    },
    elite: {
        iniciais: "ES", nome: "Elite Sports Academy", etiqueta: "Clube",
        modalidade: "Formação esportiva", posicao: "Várias modalidades", idade: 0, cidade: "Santos-SP",
        descricao: "Clube fictício de formação esportiva que acolhe jovens atletas de diversas modalidades e promove avaliações abertas.",
        seguidores: "5.400", conexoes: "1.200", conquistasTotal: "15",
        capa: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
        midia: ["photo-1431324155629-1a6deb1dec8d", "photo-1546519638-68e109498ffc", "photo-1612872087720-bb876e2e67d1"],
        info: [["Tipo", "Clube de formação"], ["Modalidades", "Futebol, basquete, vôlei e natação"], ["Faixa etária", "8 a 20 anos"], ["Fundação", "2015"], ["Cidade", "Santos-SP"]],
        experiencia: [["Fundação do clube", "2015"], ["Abertura da categoria de base", "2018"], ["Programa de avaliações abertas", "2022 - atual"]],
        estatisticas: [["11", "Anos de história"], ["450", "Atletas formados"], ["25", "Técnicos"], ["4", "Modalidades"]],
        conquistas: ["🏆 Campeão regional de base", "🥇 Melhor projeto social esportivo", "⭐ 40 atletas encaminhados a clubes"],
        publicacoes: [["Avaliação de jovens atletas com inscrições abertas!", "há 2 dias"], ["Novas turmas de formação começam em janeiro.", "há 1 semana"]]
    },
    guilherme: {
        iniciais: "GU", nome: "Guilherme", etiqueta: "Atleta",
        modalidade: "Futebol", posicao: "Meio-campista", idade: 0, cidade: "São Paulo-SP",
        descricao: "Perfil de demonstração do SportLink. Clique em Editar descrição para contar sua história no esporte.",
        seguidores: "120", conexoes: "45", conquistasTotal: "1",
        capa: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=80",
        midia: ["photo-1431324155629-1a6deb1dec8d", "photo-1517836357463-d25dfeac3438", "photo-1574629810360-7efbbe195018"],
        info: [["Modalidade", "Futebol"], ["Posição", "Meio-campista"], ["Pé dominante", "Direito"], ["Objetivo", "Encontrar uma peneira"]],
        experiencia: [["Time amador do bairro", "2023 - atual"]],
        estatisticas: [["10", "Jogos"], ["3", "Gols"], ["4", "Assistências"], ["1", "Título"]],
        conquistas: ["🏆 Campeão do torneio do bairro"],
        publicacoes: [["Entrei no SportLink! Pronto para conhecer novas oportunidades.", "há 1 dia"]]
    }
};

// Preenche a página com os dados do perfil escolhido
function carregarPerfil() {
    let parametros = new URLSearchParams(window.location.search);
    let idPerfil = parametros.get("id");

    // perfil de quem acabou de criar a conta: montado com os dados da sessão
    if (idPerfil === "meu" && localStorage.getItem("usuarioNome") !== null) {
        let nomeCompleto = localStorage.getItem("usuarioNome");
        let partes = nomeCompleto.split(" ");
        let iniciais = partes[0].charAt(0).toUpperCase();
        if (partes.length > 1) {
            iniciais = iniciais + partes[partes.length - 1].charAt(0).toUpperCase();
        }
        let tipo = localStorage.getItem("usuarioTipo");

        perfis.meu = {
            iniciais: iniciais, nome: nomeCompleto, etiqueta: tipo,
            modalidade: "A definir", posicao: "", idade: 0, cidade: "Brasil",
            descricao: "Novo perfil no SportLink. Clique em Editar descrição para contar sua história no esporte.",
            seguidores: "0", conexoes: "0", conquistasTotal: "0",
            capa: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=80",
            midia: ["photo-1431324155629-1a6deb1dec8d", "photo-1517836357463-d25dfeac3438", "photo-1574629810360-7efbbe195018"],
            info: [["Tipo de perfil", tipo], ["E-mail", localStorage.getItem("usuarioEmail")]],
            experiencia: [["Entrou no SportLink", "2026"]],
            estatisticas: [["0", "Jogos"], ["0", "Conquistas"], ["0", "Publicações"], ["0", "Conexões"]],
            conquistas: ["🎉 Conta criada no SportLink"],
            publicacoes: [["Acabei de entrar no SportLink!", "agora"]]
        };
    }

    // se o id não existir, mostra o perfil do Lucas
    if (idPerfil === null || perfis[idPerfil] === undefined) {
        idPerfil = "lucas";
    }
    let p = perfis[idPerfil];

    document.title = p.nome + " - SportLink";
    document.getElementById("capaPerfil").src = p.capa;
    document.getElementById("avatarPerfil").textContent = p.iniciais;
    document.getElementById("nomePerfil").textContent = p.nome;
    document.getElementById("descricaoPerfil").textContent = p.descricao;
    document.getElementById("textoSobre").textContent = p.descricao;
    document.getElementById("estSeguidores").textContent = p.seguidores;
    document.getElementById("estConexoes").textContent = p.conexoes;
    document.getElementById("estConquistas").textContent = p.conquistasTotal;

    // linha com etiqueta, modalidade, posição, idade e cidade
    let linha = '<span class="etiqueta">' + p.etiqueta + '</span> · ' + p.modalidade;
    if (p.posicao !== "") {
        linha = linha + " · " + p.posicao;
    }
    if (p.idade > 0) {
        linha = linha + " · " + p.idade + " anos";
    }
    linha = linha + " · 📍 " + p.cidade;
    document.getElementById("linhaPerfil").innerHTML = linha;

    // Informações esportivas
    let html = "";
    for (let i = 0; i < p.info.length; i++) {
        html = html + "<li><strong>" + p.info[i][0] + ":</strong> " + p.info[i][1] + "</li>";
    }
    document.getElementById("listaInfo").innerHTML = html;

    // Experiência
    html = "";
    for (let i = 0; i < p.experiencia.length; i++) {
        html = html + '<li><strong>' + p.experiencia[i][0] + '</strong><br><span class="legenda">' + p.experiencia[i][1] + '</span></li>';
    }
    document.getElementById("listaExperiencia").innerHTML = html;

    // Estatísticas
    html = "";
    for (let i = 0; i < p.estatisticas.length; i++) {
        html = html + '<div class="numero-box"><strong>' + p.estatisticas[i][0] + '</strong><span class="legenda">' + p.estatisticas[i][1] + '</span></div>';
    }
    document.getElementById("boxEstatisticas").innerHTML = html;

    // Conquistas
    html = "";
    for (let i = 0; i < p.conquistas.length; i++) {
        html = html + "<li>" + p.conquistas[i] + "</li>";
    }
    document.getElementById("listaConquistas").innerHTML = html;

    // Publicações recentes
    html = "";
    for (let i = 0; i < p.publicacoes.length; i++) {
        html = html + '<li>"' + p.publicacoes[i][0] + '"<br><span class="legenda">' + p.publicacoes[i][1] + '</span></li>';
    }
    document.getElementById("listaPublicacoesPerfil").innerHTML = html;

    // Mídia (3 fotos)
    html = "";
    for (let i = 0; i < p.midia.length; i++) {
        html = html + '<img src="https://images.unsplash.com/' + p.midia[i] + '?w=500&q=80" alt="Foto esportiva de ' + p.nome + '">';
    }
    document.getElementById("midiaPerfil").innerHTML = html;
}

if (document.getElementById("nomePerfil")) {
    carregarPerfil();
}
