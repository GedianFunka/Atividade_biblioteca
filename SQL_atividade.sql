SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `SQL_atividade` DEFAULT CHARACTER SET utf8 ;
USE `SQL_atividade` ;

CREATE TABLE IF NOT EXISTS `SQL_atividade`.`livro` (
  `id_livro` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NULL,
  `autor` VARCHAR(45) NULL,
  `isbn` VARCHAR(45) NULL,
  `ano_publicacao` INT NULL,  
  `categoria` VARCHAR(45) NULL,
  `quantidade` INT NOT NULL DEFAULT 0,  
  PRIMARY KEY (`id_livro`),
  UNIQUE INDEX `isbn_UNIQUE` (`isbn` ASC) VISIBLE   
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SQL_atividade`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `cpf` VARCHAR(14) NULL,                   
  `email` VARCHAR(60) NULL,
  `telefone` VARCHAR(16) NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE 
  )ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SQL_atividade`.`emprestimo` (
  `id_emprestimo` INT NOT NULL AUTO_INCREMENT,
  `data_emprestimo` DATE NULL,
  `data_prevista_devolucao` DATE NULL,
  `data_devolucao` DATE NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'em andamento',   -- adicionado (faltava)
  `id_livro` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_emprestimo`),
  INDEX `fk_emprestimo_livro_idx` (`id_livro` ASC) VISIBLE,
  INDEX `fk_emprestimo_usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_emprestimo_livro`
    FOREIGN KEY (`id_livro`)
    REFERENCES `SQL_atividade`.`livro` (`id_livro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_emprestimo_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `SQL_atividade`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `SQL_atividade`.`livro` (titulo, autor, isbn, ano_publicacao, categoria, quantidade) VALUES
('Dom Casmurro',                'Machado de Assis',       '9788508046004', 1899, 'Romance',    4),
('O Cortico',                   'Aluisio Azevedo',        '9788508046011', 1890, 'Romance',    2),
('1984',                        'George Orwell',          '9788535914849', 1949, 'Ficcao',     5),
('Clean Code',                  'Robert C. Martin',       '9780132350884', 2008, 'Tecnologia', 3),
('O Pequeno Principe',          'Antoine de Saint-Exupery','9788574065877', 1943, 'Infantil',   6),
('Sapiens',                     'Yuval Noah Harari',      '9788525432186', 2011, 'Historia',   2);

INSERT INTO `SQL_atividade`.`usuario` (nome, cpf, email, telefone) VALUES
('Gedian Silva',      '123.456.789-01', 'gedian.silva@email.com',    '(47) 99999-0001'),
('Maria Fernandes',   '234.567.890-12', 'maria.fernandes@email.com', '(47) 99999-0002'),
('Joao Pereira',      '345.678.901-23', 'joao.pereira@email.com',    '(47) 99999-0003'),
('Ana Beatriz Costa', '456.789.012-34', 'ana.costa@email.com',       '(47) 99999-0004');

INSERT INTO `SQL_atividade`.`emprestimo`
  (data_emprestimo, data_prevista_devolucao, data_devolucao, status, id_livro, id_usuario) VALUES
('2026-09-01', '2026-09-15', '2026-09-14', 'devolvido',     1, 1),
('2026-09-05', '2026-09-19', NULL,         'em andamento',  3, 2),
('2026-08-20', '2026-09-03', NULL,         'atrasado',      4, 3),
('2026-09-10', '2026-09-24', NULL,         'em andamento',  5, 4),
('2026-09-12', '2026-09-26', NULL,         'em andamento',  2, 1);

-- RF02 / RF05: Listagem de livros ordenada por titulo
SELECT * FROM livro ORDER BY titulo ASC;

-- RF03: Consulta de um livro especifico
SELECT * FROM livro WHERE id_livro = 1;

-- RF04: Pesquisa de livros por titulo, autor ou categoria
SELECT * FROM livro
WHERE titulo LIKE '%casmurro%'
   OR autor LIKE '%machado%'
   OR categoria LIKE '%romance%';

-- RF05: Ordenacao de livros por ano de publicacao (mais recentes primeiro)
SELECT * FROM livro ORDER BY ano_publicacao DESC;

-- RF10: Consulta de emprestimos com dados do livro e do usuario
SELECT
    e.id_emprestimo,
    l.titulo,
    u.nome,
    e.data_emprestimo,
    e.data_prevista_devolucao,
    e.data_devolucao,
    e.status
FROM emprestimo e
JOIN livro l   ON l.id_livro = e.id_livro
JOIN usuario u ON u.id_usuario = e.id_usuario
ORDER BY e.data_emprestimo DESC;

-- RF10: Emprestimos por usuario especifico
SELECT e.*, l.titulo
FROM emprestimo e
JOIN livro l ON l.id_livro = e.id_livro
WHERE e.id_usuario = 1;

-- RF10: Emprestimos em atraso
SELECT e.id_emprestimo, l.titulo, u.nome, e.data_prevista_devolucao
FROM emprestimo e
JOIN livro l   ON l.id_livro = e.id_livro
JOIN usuario u ON u.id_usuario = e.id_usuario
WHERE e.status = 'atrasado';