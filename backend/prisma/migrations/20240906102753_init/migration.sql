/*
  Warnings:

  - Added the required column `score` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history` ADD COLUMN `score` DOUBLE NOT NULL;
