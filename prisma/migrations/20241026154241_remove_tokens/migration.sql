/*
  Warnings:

  - You are about to drop the column `image` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `RefreshTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RefreshTokens" DROP CONSTRAINT "RefreshTokens_userId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "image",
ADD COLUMN     "avatar" TEXT;

-- DropTable
DROP TABLE "RefreshTokens";
