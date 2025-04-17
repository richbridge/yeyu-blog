/*
  Warnings:

  - You are about to alter the column `title` on the `Blog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `tagName` on the `BlogTag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - You are about to alter the column `reference` on the `Echo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.
  - You are about to alter the column `content` on the `Echo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `title` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `tagName` on the `NoteTag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE `Blog` MODIFY `title` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `BlogTag` MODIFY `tagName` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `Echo` MODIFY `reference` VARCHAR(20) NOT NULL,
    MODIFY `content` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `Note` MODIFY `title` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `NoteTag` MODIFY `tagName` VARCHAR(20) NOT NULL;
