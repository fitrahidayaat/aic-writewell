/*
  Warnings:

  - Added the required column `similarity_score` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history` ADD COLUMN `similarity_score` DOUBLE NOT NULL,
    ADD COLUMN `theme` VARCHAR(191) NOT NULL;
