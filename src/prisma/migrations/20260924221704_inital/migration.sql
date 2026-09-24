-- CreateEnum
CREATE TYPE "Papel" AS ENUM ('DIRETOR', 'DIRETOR_FOTOGRAFIA', 'SONOPLASTA', 'EDITOR', 'ROTEIRISTA', 'EFEITOS_VISUAIS');

-- CreateTable
CREATE TABLE "projeto" (
    "id" UUID NOT NULL,
    "genero" TEXT NOT NULL,
    "duracao" INTEGER NOT NULL,
    "orcamento" INTEGER NOT NULL,
    "prazo" DATE NOT NULL,

    CONSTRAINT "projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipe" (
    "id" UUID NOT NULL,
    "data_formacao" DATE NOT NULL,
    "status" TEXT NOT NULL,
    "projeto_id" UUID NOT NULL,

    CONSTRAINT "equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membro_equipe" (
    "id" UUID NOT NULL,
    "papel" "Papel" NOT NULL,
    "confirmado" BOOLEAN NOT NULL,
    "equipe_id" UUID NOT NULL,
    "profissionalId" UUID NOT NULL,

    CONSTRAINT "membro_equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profissional" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "disponibilidade_inicio" TEXT NOT NULL,
    "disponibilidade_fim" TEXT NOT NULL,
    "precoMedio" INTEGER NOT NULL,

    CONSTRAINT "profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliacao" (
    "id" UUID NOT NULL,
    "nota" INTEGER NOT NULL,
    "profissionalId" UUID NOT NULL,

    CONSTRAINT "avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competencia" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "profissionalId" UUID NOT NULL,

    CONSTRAINT "competencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipe_projeto_id_key" ON "equipe"("projeto_id");

-- CreateIndex
CREATE UNIQUE INDEX "membro_equipe_profissionalId_key" ON "membro_equipe"("profissionalId");

-- AddForeignKey
ALTER TABLE "equipe" ADD CONSTRAINT "equipe_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membro_equipe" ADD CONSTRAINT "membro_equipe_equipe_id_fkey" FOREIGN KEY ("equipe_id") REFERENCES "equipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membro_equipe" ADD CONSTRAINT "membro_equipe_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competencia" ADD CONSTRAINT "competencia_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
