-- AlterTable
ALTER TABLE "users" ADD COLUMN     "interest1" TEXT,
ADD COLUMN     "interest2" TEXT,
ADD COLUMN     "interest3" TEXT,
ADD COLUMN     "interest4" TEXT,
ADD COLUMN     "major" TEXT,
ADD COLUMN     "preProfessionalTrack" TEXT,
ADD COLUMN     "school" TEXT,
ADD COLUMN     "schoolYear" TEXT,
ADD COLUMN     "willGetAdvice" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "willGiveAdvice" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "zipCode" TEXT;
