# 🛒 Ecobuy - Front-End vom Vue.js

Esse projeto é o front-end de um e-commerce de produtos orgânicos, desenvolvido com **Vue.js**, criado para a conclusão do curso **Code Academy Front-end T4** oferecido pela 3C Plus - empresa de tecnologia na cidade de Guarapuava-PR onde atualmente resido.
O projeto consome uma **API REST** criada pelo meu professor, e esse curso é parte do meu processo de transição de carreira para a área de tecnologia.

## 🚀 Tecnologias utilizadas

- [Vue.js 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) — gerenciamento de estado
- [Vue Router](https://router.vuejs.org/) — rotas SPA
- [Axios](https://axios-http.com/) — requisições HTTP
- [Sass](https://sass-lang.com/) — pré-processador CSS
- [Bootstrap](https://getbootstrap.com/) — layout e responsividade
- [Vue Toastification](https://vue-toastification.maronato.dev/) — notificações visuais
- CSS — estilização customizada

## ⚙️ Funcionalidades

### 👤 Usuário Cliente
- Listagem de produtos com dados vindos da API
- Filtro por categorias e ofertas
- Sistema de **busca com sugestão automática**, exibindo apenas produtos disponíveis conforme o termo digitado
- Login e registro de usuários
- Edição dados e foto de perfil
- Cadastro de endereços e definição de endereço padrão
- Adição e remoção de itens da sacola
- Alteração de quantidade dos produtos 
- Cálculo de frete com base no valor total da sacola
- Aplicação de cupons de desconto
- Escolha da forma de pagamento
- Finalização de pedidos
- Consulta de hitórico de pedido com status e detalhes
- Cancelamento de pedidos

### 🛠 Usuário Moderador
- Todas as funcionalidades de cliente
- Cadastro e edição de produtos
- Controle de estoque
- Cadastro e edição de descontos
- Cadastro e edição de cupons
- Listagem de pedidos da loja
- Atualização de status de pedido

### 🛡 Usuário Administrador
- Todas as funcionalidades de moderador
- Cadastro, edição e exclusão de categorias
- Exclusão de produtos
- Permissão para criar usuários moderadores


## 🧠 Código

- Estrutura modular com componentes reutilizáveis
- Navegação e proteção de rotas
- Integração com API para consumo dinâmico de dados
- Persistência de dados
- Reatividade e responsividade
- Função auxiliar para requisições HTTP

## 📦 Como rodar o projeto

1. **Clone o repositório**
```bash
git clone https://github.com/javorskinha/marketplace.git
```

2. **Acesse a pasta do projeto**
```bash
cd marketplace
```

3. **Instale as dependências**
```bash
npm install
```

4. **Configure a URL da API**
Crie um arquivo .env na raiz com o seguinte conteúdo:
```env
VITE_API_BASE_URL=https://35.196.79.227:8000/
```

5. **Inicie o projeto**
```bash
npm run dev
```

## 📁 Estrutura de pastas

```ide
src/
├── assets/
├── components/
├── router/
├── services/
├── stores/
├── views/
├── App.vue
└── main.js
```

## 💡 Melhorias futuras

- Página de frete grátis
- Página "sobre"
- Página de contato
- Implementação de favoritos
- Biblioteca de endereçamento por CEP
- Implementar marcadores/selos visuais para destacar produtos

## 👩‍💻 Sobre mim
Este projeto faz parte do meu portfólio como aluna do curso presencial de front-end Code Academy e estudante de Análise e Desenvolvimento de Sistemas. Estou em transição de carreira, vindo da área da saúde, e buscando minha primeira oportunidade como desenvolvedora front-end.

## 📄 Licença
Este projeto está sob a licença MIT.
