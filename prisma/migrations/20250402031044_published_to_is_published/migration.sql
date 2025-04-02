/*
  Warnings:

  - You are about to drop the column `published` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `published`,
    ADD COLUMN `isPublished` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Note` DROP COLUMN `published`,
    ADD COLUMN `isPublished` BOOLEAN NOT NULL DEFAULT true;
