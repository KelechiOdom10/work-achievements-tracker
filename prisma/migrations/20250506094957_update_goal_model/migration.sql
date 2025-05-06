/*
  Warnings:

  - Made the column `companyId` on table `goals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "goals" ALTER COLUMN "companyId" SET NOT NULL;
