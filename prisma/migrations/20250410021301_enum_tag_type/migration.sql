/*
  Warnings:

  - You are about to alter the column `tagType` on the `BlogTag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `tagType` on the `NoteTag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `BlogTag` MODIFY `tagType` ENUM('BLOG', 'NOTE') NOT NULL DEFAULT 'BLOG';

-- AlterTable
ALTER TABLE `NoteTag` MODIFY `tagType` ENUM('BLOG', 'NOTE') NOT NULL DEFAULT 'NOTE';
