/*
  Warnings:

  - You are about to drop the `Agendamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Turma` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Agendamento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Turma";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "turma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "capacidade" INTEGER NOT NULL,
    "horaInicio" DATETIME NOT NULL,
    "horaFim" DATETIME NOT NULL,
    "modalidadeId" INTEGER NOT NULL,
    "colaboradorId" TEXT NOT NULL,
    CONSTRAINT "turma_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "colaborador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "turma_modalidadeId_fkey" FOREIGN KEY ("modalidadeId") REFERENCES "modalidade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataAgendamento" DATETIME NOT NULL,
    "cancelado" BOOLEAN NOT NULL,
    "usuarioCadastro" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,
    CONSTRAINT "agendamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "agendamento_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "horarios" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "instagram" TEXT NOT NULL
);
