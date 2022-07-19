-- CreateTable
CREATE TABLE "recebimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "dataRecebimento" DATETIME NOT NULL,
    "valor" DECIMAL NOT NULL,
    "referencia" TEXT NOT NULL,
    "dataCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteId" TEXT,
    CONSTRAINT "recebimento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pagamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "dataPagamento" DATETIME NOT NULL,
    "valor" DECIMAL NOT NULL,
    "dataCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ficha_treino" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "dataCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "colaboradorId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "modalidadeId" INTEGER NOT NULL,
    CONSTRAINT "ficha_treino_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ficha_treino_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "colaborador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ficha_treino_modalidadeId_fkey" FOREIGN KEY ("modalidadeId") REFERENCES "modalidade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "divisao_treino" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "fichaTreinoId" INTEGER NOT NULL,
    CONSTRAINT "divisao_treino_fichaTreinoId_fkey" FOREIGN KEY ("fichaTreinoId") REFERENCES "ficha_treino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "exercicio_ficha_treino" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "grupoMuscular" TEXT NOT NULL,
    "peso" DECIMAL NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "series" INTEGER NOT NULL,
    "observacao" TEXT NOT NULL,
    "divisaoTreinoId" INTEGER NOT NULL,
    CONSTRAINT "exercicio_ficha_treino_divisaoTreinoId_fkey" FOREIGN KEY ("divisaoTreinoId") REFERENCES "divisao_treino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
