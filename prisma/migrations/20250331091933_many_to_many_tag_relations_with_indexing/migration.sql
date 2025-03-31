/*
  Warnings:

  - You are about to drop the column `tagId` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `Note` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Blog` DROP FOREIGN KEY `Blog_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `Note` DROP FOREIGN KEY `Note_tagId_fkey`;

-- DropIndex
DROP INDEX `Blog_tagId_fkey` ON `Blog`;

-- DropIndex
DROP INDEX `Note_tagId_fkey` ON `Note`;

-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `tagId`;

-- AlterTable
ALTER TABLE `Note` DROP COLUMN `tagId`;

-- CreateTable
CREATE TABLE `TagOnBlog` (
    `blogId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`blogId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TagOnNote` (
    `noteId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`noteId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TagOnBlog` ADD CONSTRAINT `TagOnBlog_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagOnBlog` ADD CONSTRAINT `TagOnBlog_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagOnNote` ADD CONSTRAINT `TagOnNote_noteId_fkey` FOREIGN KEY (`noteId`) REFERENCES `Note`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagOnNote` ADD CONSTRAINT `TagOnNote_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
