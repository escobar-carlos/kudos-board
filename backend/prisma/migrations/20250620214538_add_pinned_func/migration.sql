-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "pin_date" TIMESTAMP(3),
ADD COLUMN     "pinned" BOOLEAN NOT NULL DEFAULT false;
