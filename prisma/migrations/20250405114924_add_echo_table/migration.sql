-- CreateTable
CREATE TABLE `Echo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reference` VARCHAR(50) NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
