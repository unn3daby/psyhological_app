/*
  Warnings:

  - A unique constraint covering the columns `[jti]` on the table `RefreshTokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jti` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshTokens" ADD COLUMN     "jti" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_jti_key" ON "RefreshTokens"("jti");
