-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_companyId_fkey";

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
