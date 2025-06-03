/*
  Warnings:

  - You are about to drop the column `stripeSubscriptionId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionEndsAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `trialEndsAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "stripeSubscriptionId",
DROP COLUMN "subscriptionEndsAt",
DROP COLUMN "subscriptionId",
DROP COLUMN "trialEndsAt",
ADD COLUMN     "purchaseDate" TIMESTAMP(3),
ADD COLUMN     "stripePaymentId" TEXT;
