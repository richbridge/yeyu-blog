/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagOnBlog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagOnNote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TagOnBlog` DROP FOREIGN KEY `TagOnBlog_blogId_fkey`;

-- DropForeignKey
ALTER TABLE `TagOnBlog` DROP FOREIGN KEY `TagOnBlog_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `TagOnNote` DROP FOREIGN KEY `TagOnNote_noteId_fkey`;

-- DropForeignKey
ALTER TABLE `TagOnNote` DROP FOREIGN KEY `TagOnNote_tagId_fkey`;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `TagOnBlog`;

-- DropTable
DROP TABLE `TagOnNote`;

-- CreateTable
CREATE TABLE `BlogTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tagName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `BlogTag_tagName_key`(`tagName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NoteTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tagName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `NoteTag_tagName_key`(`tagName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BlogToBlogTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BlogToBlogTag_AB_unique`(`A`, `B`),
    INDEX `_BlogToBlogTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_NoteToNoteTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NoteToNoteTag_AB_unique`(`A`, `B`),
    INDEX `_NoteToNoteTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_BlogToBlogTag` ADD CONSTRAINT `_BlogToBlogTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlogToBlogTag` ADD CONSTRAINT `_BlogToBlogTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `BlogTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NoteToNoteTag` ADD CONSTRAINT `_NoteToNoteTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Note`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NoteToNoteTag` ADD CONSTRAINT `_NoteToNoteTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `NoteTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
