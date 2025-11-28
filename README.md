# Cardápio Digital & Delivery 

Uma aplicação web de autoatendimento para restaurantes, desenvolvida para simular a experiência real de um e-commerce de delivery, desde a escolha do produto até o fechamento do pedido via WhatsApp.

🔗 **Acesse o projeto online:** (https://guscatigna-web.github.io/cardapio-digital/)

##  Funcionalidades

O projeto vai além do visual, implementando lógica de negócios e gerenciamento de estado no Front-end:

- **Vitrine Dinâmica:** Os produtos não estão "chumbados" no HTML. O site lê um arquivo `dados.json` externo e renderiza os cards automaticamente.
- **Carrinho de Compras:** Sistema completo de gerenciamento de estado (adicionar itens, remover itens, visualização em lista).
- **Cálculo Automático:** O sistema soma os valores dos itens e atualiza o Subtotal em tempo real.
- **Checkout via WhatsApp:** Ao finalizar o pedido, o sistema gera uma mensagem formatada com a lista de itens e o valor total, abrindo diretamente a conversa com o restaurante.
- **Filtros de Categoria:** Navegação fluida entre tipos de produtos (Burgers, Bebidas, etc.) sem recarregar a página.

##  Tecnologias Utilizadas

- **JavaScript (ES6+):**
  - `fetch` API para consumo de dados.
  - Métodos de Array (`map`, `filter`, `reduce`, `find`) para manipulação do carrinho e busca.
  - Manipulação avançada de DOM.
- **HTML5 Semântico:** Estrutura organizada e acessível.
- **CSS3:**
  - `Grid Layout` e `Flexbox` para responsividade.
  - Animações CSS para modais e interações de botões.
  - Design Responsivo (Mobile First).

##  Aprendizados e Desafios

Este projeto foi fundamental para consolidar conceitos de **Lógica de Programação** aplicada ao mundo real:
- **Gerenciamento de Estado:** Manter a lista de itens do carrinho (`carrinho = []`) sincronizada com a interface visual.
- **Formatação de Dados:** Tratar valores monetários (`toFixed`, `replace`) para exibição correta no padrão brasileiro (R$).
- **Integração Externa:** Uso da API de URL do WhatsApp para conectar o sistema web com o aplicativo de mensagens.

##  Autor

Desenvolvido por **Gustavo Scatigna** como parte do portfólio de Desenvolvimento Web Front-end.

---
*Este projeto é open-source e está disponível para estudos.*