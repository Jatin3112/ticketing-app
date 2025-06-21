-- CreateTable
CREATE TABLE `Replies` (
    `id` VARCHAR(191) NOT NULL,
    `ticketsId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Replies` ADD CONSTRAINT `Replies_ticketsId_fkey` FOREIGN KEY (`ticketsId`) REFERENCES `Tickets`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
