CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE tarefas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    descricao TEXT NOT NULL,
    nome_setor VARCHAR(255) NOT NULL,
    prioridade ENUM('baixa', 'média', 'alta') NOT NULL,
    data_cadastro DATETIME NOT NULL,
    status ENUM('a fazer', 'fazendo', 'pronto') NOT NULL DEFAULT 'a fazer',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);