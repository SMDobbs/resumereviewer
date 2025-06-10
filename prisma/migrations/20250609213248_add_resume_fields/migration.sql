-- AlterTable
ALTER TABLE "users" ADD COLUMN     "remainingReviews" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "resume_reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "overallScore" DOUBLE PRECISION,
    "contentScore" DOUBLE PRECISION,
    "formattingScore" DOUBLE PRECISION,
    "atsScore" DOUBLE PRECISION,
    "keywordScore" DOUBLE PRECISION,
    "aiFeedback" JSONB NOT NULL,
    "suggestions" JSONB,
    "processingStatus" TEXT NOT NULL DEFAULT 'processing',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resume_reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resume_reviews" ADD CONSTRAINT "resume_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
