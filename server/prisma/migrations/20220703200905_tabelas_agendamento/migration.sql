-- CreateTable
CREATE TABLE "modalidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "capacidade" INTEGER NOT NULL,
    "horaInicio" DATETIME NOT NULL,
    "horaFim" DATETIME NOT NULL,
    "modalidadeId" INTEGER NOT NULL,
    "colaboradorId" TEXT NOT NULL,
    CONSTRAINT "Turma_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "colaborador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Turma_modalidadeId_fkey" FOREIGN KEY ("modalidadeId") REFERENCES "modalidade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataAgendamento" DATETIME NOT NULL,
    "cancelado" BOOLEAN NOT NULL,
    "usuarioCadastro" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,
    CONSTRAINT "Agendamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Agendamento_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
