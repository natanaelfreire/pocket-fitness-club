-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataMensalidade" DATETIME NOT NULL,
    "valorMensalidade" DECIMAL NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_cliente" ("ativo", "cpf", "dataMensalidade", "dataNascimento", "endereco", "id", "nome", "telefone", "valorMensalidade") SELECT "ativo", "cpf", "dataMensalidade", "dataNascimento", "endereco", "id", "nome", "telefone", "valorMensalidade" FROM "cliente";
DROP TABLE "cliente";
ALTER TABLE "new_cliente" RENAME TO "cliente";
CREATE UNIQUE INDEX "cliente_cpf_key" ON "cliente"("cpf");
CREATE TABLE "new_colaborador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "especialidade" TEXT,
    "formacao" TEXT,
    "cargo" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_colaborador" ("cargo", "cpf", "endereco", "especialidade", "formacao", "id", "nome", "telefone") SELECT "cargo", "cpf", "endereco", "especialidade", "formacao", "id", "nome", "telefone" FROM "colaborador";
DROP TABLE "colaborador";
ALTER TABLE "new_colaborador" RENAME TO "colaborador";
CREATE UNIQUE INDEX "colaborador_cpf_key" ON "colaborador"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
