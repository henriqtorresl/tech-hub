-- Arquivo de criação das tabelas
CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR,
    senha VARCHAR,
    cpf VARCHAR,
    email VARCHAR,
    telefone VARCHAR
);

CREATE TABLE Publicacao (
    id_publicacao SERIAL PRIMARY KEY,
    titulo VARCHAR,
    conteudo VARCHAR,
    id_usuario INTEGER,
    CONSTRAINT FK_Publicacao_Usuario FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario)
);

CREATE TABLE Curtida (
    id_curtida SERIAL PRIMARY KEY,
    id_publicacao INTEGER,
    id_usuario INTEGER,
    CONSTRAINT FK_Curtida_Publicacao FOREIGN KEY (id_publicacao) REFERENCES Publicacao (id_publicacao),
    CONSTRAINT FK_Curtida_Usuario FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario)
);

CREATE TABLE Comentario (
    id_comentario SERIAL PRIMARY KEY,
    data DATE,
    conteudo VARCHAR,
    id_publicacao INTEGER,
    id_usuario INTEGER,
    CONSTRAINT FK_Comentario_Publicacao FOREIGN KEY (id_publicacao) REFERENCES Publicacao (id_publicacao),
    CONSTRAINT FK_Comentario_Usuario FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario)
);

CREATE TABLE Conversa (
    id_conversa SERIAL PRIMARY KEY,
    id_usuario_1 INTEGER,
    id_usuario_2 INTEGER,
    FOREIGN KEY (id_usuario_1) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_usuario_2) REFERENCES usuario(id_usuario)
);

CREATE TABLE Mensagem (
    id_mensagem SERIAL PRIMARY KEY,
    data DATE,
    conteudo VARCHAR,
    lida BOOLEAN,
    id_conversa INTEGER,
    id_usuario_remetente INTEGER,
    id_usuario_destinatario INTEGER,
    CONSTRAINT FK_Mensagem_Conversa FOREIGN KEY (id_conversa) REFERENCES Conversa (id_conversa),
    CONSTRAINT FK_Mensagem_Usuario_Remetente FOREIGN KEY (id_usuario_remetente) REFERENCES Usuario (id_usuario),
    CONSTRAINT FK_Mensagem_Usuario_Destinatario FOREIGN KEY (id_usuario_destinatario) REFERENCES Usuario (id_usuario)
);

-- Procedures

-- Função que cria uma conversa, caso ela não exista
CREATE OR REPLACE FUNCTION criar_conversa(usuario_1 INTEGER, usuario_2 INTEGER)
RETURNS VOID AS
$$
BEGIN 
	PERFORM * FROM conversa c 
    WHERE (c.id_usuario_1 = usuario_1 AND c.id_usuario_2 = usuario_2)
    OR (c.id_usuario_1 = usuario_2 AND c.id_usuario_2 = usuario_1);	
    IF NOT FOUND THEN
    	-- Se não existe uma conversa entre esses dois usuários, eu crio uma nova conversa, se não, não faço nada
		INSERT INTO conversa (id_usuario_1, id_usuario_2) VALUES (usuario_1, usuario_2);
	END IF;
END;
$$
LANGUAGE plpgsql;