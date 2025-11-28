let dados = [];
let carrinho = [];
/* ============== CARDS ==============*/
const containerCards = document.getElementById('container-cards');

async function carregarDados() {
    try {
        const resposta = await fetch('dados.json');
        
        dados = await resposta.json();

        mostrarCards(dados);

    } catch (erro) {
        console.error("Erro ao carregar os dados:", erro);
    }
}

function mostrarCards(listaDeItens) {
    containerCards.innerHTML = '';

    listaDeItens.forEach(item => {

        const cartaoHTML = `
            <div class="card" data-categoria="${item.categoria}">
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="card-conteudo">
                    <h3>${item.nome}</h3>
                    <p>${item.descricao}</p>
                    
                    <div class="card-footer">
                        <span class="preco">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                        <button class="btn-adicionar" onclick="adicionarAoCarrinho(${item.id})">
                            Adicionar
                        </button>
                    </div>

                    <div class="tags">
                        ${item.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        containerCards.innerHTML += cartaoHTML;
    });
}

carregarDados();

/* ============== FILTROS ==============*/

const botoesFiltro = document.querySelectorAll('.btn-filtro');

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        
        botoesFiltro.forEach(b => b.classList.remove('ativo'));
        
        botao.classList.add('ativo');

        const categoriaSelecionada = botao.getAttribute('data-categoria');

        if (categoriaSelecionada === 'tudo') {
            
            mostrarCards(dados);
        } else {
            
            const dadosFiltrados = dados.filter(item => item.categoria === categoriaSelecionada);
            
            mostrarCards(dadosFiltrados);
        }
    });
});

// --- LÓGICA DO CARRINHO ---

function adicionarAoCarrinho(idProduto) {
    // 1. Encontrar o item que foi clicado dentro da nossa lista de dados
    // O .find() procura o primeiro item que tiver o ID igual ao que passamos
    const itemAdicionado = dados.find(item => item.id === idProduto);

    if (itemAdicionado) {
        // 2. Adicionar o item na lista do carrinho
        carrinho.push(itemAdicionado);

        // 3. Atualizar o número lá no botão do topo
        document.getElementById('contador-carrinho').innerText = carrinho.length;

        // Feedback visual (depois faremos algo mais chique)
        console.log("Carrinho atualizado:", carrinho);
        alert(`Delícia! ${itemAdicionado.nome} foi para o carrinho.`);
    }
}

// --- INTERAÇÃO DO MODAL ---

const btnCarrinho = document.getElementById('btn-carrinho');
const modalCarrinho = document.getElementById('modal-carrinho');
const btnFecharModal = document.getElementById('btn-fechar-modal');

// Abrir Modal
btnCarrinho.addEventListener('click', () => {
    atualizarCarrinhoModal();
    modalCarrinho.style.display = 'flex';
    // Aqui depois chamaremos a função para desenhar os itens do carrinho
});

// Fechar Modal (Clicando no X)
btnFecharModal.addEventListener('click', () => {
    modalCarrinho.style.display = 'none';
});

// Fechar Modal (Clicando fora da janela branca)
modalCarrinho.addEventListener('click', (e) => {
    if (e.target === modalCarrinho) {
        modalCarrinho.style.display = 'none';
    }
});

// --- FUNÇÃO PARA ATUALIZAR O MODAL ---

function atualizarCarrinhoModal() {
    const containerItens = document.getElementById('itens-carrinho');
    const spanTotal = document.getElementById('preco-total');
    
    // 1. Limpa o conteúdo anterior
    containerItens.innerHTML = '';
    
    let total = 0;

    // 2. Verifica se está vazio
    if (carrinho.length === 0) {
        containerItens.innerHTML = '<p>Seu carrinho está vazio 😢</p>';
        spanTotal.innerText = 'R$ 0,00';
        return;
    }

    // 3. Desenha os itens
    carrinho.forEach(item => {
        const itemHTML = `
            <div class="item-carrinho" style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                <div>
                    <strong>${item.nome}</strong>
                    <p style="color: #666; font-size: 0.9rem; margin: 0;">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <button onclick="removerDoCarrinho(${item.id})" style="color: red; background: none; border: none; cursor: pointer; font-weight: bold;">X</button>
            </div>
        `;
        containerItens.innerHTML += itemHTML;
        
        // Soma ao total
        total += item.preco;
    });

    // 4. Atualiza o valor final na tela
    spanTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removerDoCarrinho(idProduto) {
    // Encontra o índice do item no array
    const index = carrinho.findIndex(item => item.id === idProduto);
    
    if (index !== -1) {
        carrinho.splice(index, 1); // Remove o item da lista
        document.getElementById('contador-carrinho').innerText = carrinho.length; // Atualiza o topo
        atualizarCarrinhoModal(); // Atualiza o modal aberto visualmente
    }
}

const btnFinalizar = document.getElementById('btn-finalizar');

btnFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Monta a mensagem
    let mensagem = "Olá! Gostaria de fazer um pedido:\n\n";
    
    carrinho.forEach(item => {
        mensagem += `- ${item.nome} (R$ ${item.preco.toFixed(2).replace('.', ',')})\n`;
    });

    // Calcula o total novamente para garantir
    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    mensagem += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

    // Codifica para URL (troca espaços por %20, etc)
    const urlWhatsapp = `https://wa.me/5531983248877?text=${encodeURIComponent(mensagem)}`;

    // Abre em nova aba
    window.open(urlWhatsapp, '_blank');
});

/* ============== BUSCA ESCRITA ==============*/

/*const campoBusca = document.getElementById('campo-busca');

campoBusca.addEventListener('input', () => {
    
    const termoDigitado = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(item => {
    
        const nomeItem = item.nome.toLowerCase();
        
        const buscaPorNome = nomeItem.includes(termoDigitado);
        
        const buscaPorTag = item.tags.some(tag => tag.toLowerCase().includes(termoDigitado));

        return buscaPorNome || buscaPorTag;
    });
    mostrarCards(dadosFiltrados);
}); */