-- DropForeignKey
ALTER TABLE "papel_obrigatorio" DROP CONSTRAINT "papel_obrigatorio_projeto_id_fkey";

-- AddForeignKey
ALTER TABLE "papel_obrigatorio" ADD CONSTRAINT "papel_obrigatorio_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
