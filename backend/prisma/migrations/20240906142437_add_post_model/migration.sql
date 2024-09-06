/*
  Warnings:

  - Added the required column `question` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history` ADD COLUMN `question` TEXT NOT NULL;
