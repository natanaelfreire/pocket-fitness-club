/*
  Warnings:

  - You are about to drop the `acesso_funcionalidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `perfil_acesso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `perfilAcessoId` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `perfilAcesso` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "acesso_funcionalidade";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "perfil_acesso";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfilAcesso" TEXT NOT NULL,
    "clienteId" TEXT,
    "colaboradorId" TEXT,
    CONSTRAINT "usuario_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "usuario_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "colaborador" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_usuario" ("clienteId", "colaboradorId", "email", "id", "nome", "senha") SELECT "clienteId", "colaboradorId", "email", "id", "nome", "senha" FROM "usuario";
DROP TABLE "usuario";
ALTER TABLE "new_usuario" RENAME TO "usuario";
CREATE UNIQUE INDEX "usuario_clienteId_key" ON "usuario"("clienteId");
CREATE UNIQUE INDEX "usuario_colaboradorId_key" ON "usuario"("colaboradorId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
