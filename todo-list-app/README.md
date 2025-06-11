# Todo List App

Este projeto é uma aplicação de gerenciamento de tarefas no formato "to do list". A aplicação permite que os usuários cadastrem suas tarefas, organizem-nas por status e priorizem-nas conforme necessário.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
todo-list-app
├── src
│   ├── css
│   │   └── style.css         # Estilos da aplicação
│   ├── js
│   │   └── app.js            # Lógica da aplicação
│   └── index.html            # Página principal da aplicação
├── db
│   └── schema.sql            # Script SQL para criação do banco de dados
└── README.md                 # Documentação do projeto
```

## Configuração do Banco de Dados

O arquivo `db/schema.sql` contém o script para a criação das tabelas necessárias:

- **Tabela `usuarios`**:
  - `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
  - `nome` (VARCHAR, NOT NULL)
  - `email` (VARCHAR, NOT NULL, UNIQUE)

- **Tabela `tarefas`**:
  - `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
  - `id_usuario` (INT, FOREIGN KEY, NOT NULL)
  - `descricao` (TEXT, NOT NULL)
  - `nome_setor` (VARCHAR, NOT NULL)
  - `prioridade` (ENUM('baixa', 'média', 'alta'), NOT NULL)
  - `data_cadastro` (DATETIME, NOT NULL)
  - `status` (ENUM('a fazer', 'fazendo', 'pronto'), NOT NULL DEFAULT 'a fazer')

## Funcionalidades

A aplicação possui as seguintes funcionalidades:

- Cadastro de usuários com validação dos campos do formulário.
- Cadastro de tarefas, associando-as a um usuário.
- Atualização do status e prioridade das tarefas.
- Exclusão de tarefas.
- Carregamento e exibição das tarefas em uma tabela, organizadas por status.

## Instruções para Execução

1. **Configurar o Banco de Dados**:
   - Execute o script contido em `db/schema.sql` em seu servidor MySQL para criar as tabelas necessárias.

2. **Executar a Aplicação**:
   - Abra o arquivo `src/index.html` em um navegador para acessar a interface da aplicação.

3. **Interagir com a Aplicação**:
   - Utilize os formulários para cadastrar usuários e tarefas, e visualize as tarefas organizadas por status na tabela.

## Observações

- Todos os campos de cadastro são obrigatórios e devem ser validados.
- Mensagens de sucesso ou erro serão exibidas ao usuário após as operações de cadastro e atualização.