-- DropForeignKey
ALTER TABLE "UserTransfer" DROP CONSTRAINT "UserTransfer_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "UserTransfer" DROP CONSTRAINT "UserTransfer_senderId_fkey";

-- AlterTable
ALTER TABLE "UserTransfer" ALTER COLUMN "senderId" SET DATA TYPE TEXT,
ALTER COLUMN "recipientId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "UserTransfer" ADD CONSTRAINT "UserTransfer_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("login") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTransfer" ADD CONSTRAINT "UserTransfer_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("login") ON DELETE RESTRICT ON UPDATE CASCADE;
