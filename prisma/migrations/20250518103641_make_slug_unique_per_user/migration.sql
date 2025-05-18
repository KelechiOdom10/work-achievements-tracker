/*
  Warnings:

  - A unique constraint covering the columns `[userId,slug]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "companies_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "companies_userId_slug_key" ON "companies"("userId", "slug");
