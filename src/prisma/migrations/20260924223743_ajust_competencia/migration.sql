/*
  Warnings:

  - Changed the type of `nivel` on the `competencia` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "competencia" DROP COLUMN "nivel",
ADD COLUMN     "nivel" INTEGER NOT NULL;
