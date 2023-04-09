/*
  Warnings:

  - You are about to drop the column `recipientId` on the `UserTransfer` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `UserTransfer` table. All the data in the column will be lost.
  - Added the required column `recipientLogin` to the `UserTransfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderLogin` to the `UserTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserTransfer" DROP CONSTRAINT "UserTransfer_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "UserTransfer" DROP CONSTRAINT "UserTransfer_senderId_fkey";

-- AlterTable
ALTER TABLE "UserTransfer" DROP COLUMN "recipientId",
DROP COLUMN "senderId",
ADD COLUMN     "recipientLogin" TEXT NOT NULL,
ADD COLUMN     "senderLogin" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserTransfer" ADD CONSTRAINT "UserTransfer_senderLogin_fkey" FOREIGN KEY ("senderLogin") REFERENCES "User"("login") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTransfer" ADD CONSTRAINT "UserTransfer_recipientLogin_fkey" FOREIGN KEY ("recipientLogin") REFERENCES "User"("login") ON DELETE RESTRICT ON UPDATE CASCADE;
