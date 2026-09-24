/*
  Warnings:

  - Added the required column `comentario` to the `avaliacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `avaliacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "avaliacao" ADD COLUMN     "comentario" TEXT NOT NULL,
ADD COLUMN     "data" DATE NOT NULL;
