/*
  Warnings:

  - Made the column `content` on table `Blog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Note` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Blog` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Note` MODIFY `content` TEXT NOT NULL;
