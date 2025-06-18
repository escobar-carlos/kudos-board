/*
  Warnings:

  - Made the column `author` on table `Board` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "author" SET NOT NULL;
