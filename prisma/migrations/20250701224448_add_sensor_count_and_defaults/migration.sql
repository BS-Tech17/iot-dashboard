/*
  Warnings:

  - Made the column `data` on table `sensors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "devices" ALTER COLUMN "x" SET DEFAULT 0,
ALTER COLUMN "y" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "sensors" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "data" SET NOT NULL,
ALTER COLUMN "data" SET DEFAULT '[]';
