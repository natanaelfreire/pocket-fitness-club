-- CreateTable
CREATE TABLE "cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataMensalidade" DATETIME NOT NULL,
    "valorMensalidade" DECIMAL NOT NULL,
    "ativo" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "colaborador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "especialidade" TEXT,
    "formacao" TEXT,
    "cargo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfilAcessoId" INTEGER NOT NULL,
    "clienteId" TEXT,
    "colaboradorId" TEXT,
    CONSTRAINT "usuario_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "usuario_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "colaborador" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "usuario_perfilAcessoId_fkey" FOREIGN KEY ("perfilAcessoId") REFERENCES "perfil_acesso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "perfil_acesso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "acesso_funcionalidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "icone" TEXT NOT NULL,
    "caminho" TEXT NOT NULL,
    "perfilAcessoId" INTEGER NOT NULL,
    CONSTRAINT "acesso_funcionalidade_perfilAcessoId_fkey" FOREIGN KEY ("perfilAcessoId") REFERENCES "perfil_acesso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_cpf_key" ON "cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "colaborador_cpf_key" ON "colaborador"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_clienteId_key" ON "usuario"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_colaboradorId_key" ON "usuario"("colaboradorId");
