/*
  Warnings:

  - The values [ACTIVE] on the enum `SubscriptionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionStatus_new" AS ENUM ('TRIAL', 'PREMIUM', 'CANCELLED', 'EXPIRED');
ALTER TABLE "users" ALTER COLUMN "subscriptionStatus" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "subscriptionStatus" TYPE "SubscriptionStatus_new" USING ("subscriptionStatus"::text::"SubscriptionStatus_new");
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
ALTER TYPE "SubscriptionStatus_new" RENAME TO "SubscriptionStatus";
DROP TYPE "SubscriptionStatus_old";
ALTER TABLE "users" ALTER COLUMN "subscriptionStatus" SET DEFAULT 'TRIAL';
COMMIT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT;
