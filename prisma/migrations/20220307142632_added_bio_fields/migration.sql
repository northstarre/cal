-- AlterTable
ALTER TABLE "users" ADD COLUMN     "degree" TEXT,
ADD COLUMN     "graduationMonth" TEXT,
ADD COLUMN     "graduationYear" TEXT;

-- CreateTable
CREATE TABLE "Credit" (
    "userId" INTEGER NOT NULL,
    "activeCredits" INTEGER NOT NULL,
    "expiredCredits" INTEGER NOT NULL,
    "LastPurchaseDate" TIMESTAMP(3) NOT NULL,
    "UsedCredits" INTEGER NOT NULL,
    "LastUtilisedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credit_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
