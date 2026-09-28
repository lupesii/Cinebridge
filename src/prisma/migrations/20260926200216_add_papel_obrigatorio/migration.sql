/*
  Warnings:

  - Added the required column `localizacao` to the `projeto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "tipoCaptacao" AS ENUM ('DOCUMENTARIO', 'FICCAO', 'ANIMACAO', 'ACAO', 'AVENTURA');

-- DropIndex
DROP INDEX "membro_equipe_profissionalId_key";

-- AlterTable
ALTER TABLE "projeto" ADD COLUMN     "localizacao" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "papel_obrigatorio" (
    "projeto_id" UUID NOT NULL,
    "papel" TEXT NOT NULL,
    "peso" INTEGER NOT NULL,

    CONSTRAINT "papel_obrigatorio_pkey" PRIMARY KEY ("projeto_id")
);

-- AddForeignKey
ALTER TABLE "papel_obrigatorio" ADD CONSTRAINT "papel_obrigatorio_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
