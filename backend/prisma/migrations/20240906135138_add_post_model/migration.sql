/*
  Warnings:

  - You are about to drop the column `similarity_score` on the `history` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `history` DROP COLUMN `similarity_score`,
    DROP COLUMN `theme`;
