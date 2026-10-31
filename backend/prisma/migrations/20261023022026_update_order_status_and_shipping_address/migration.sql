/*
  Warnings:

  - The values [PENDING,PAID,SHIPPED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `shipping_address` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('CONFIRMED', 'CANCELLED');
ALTER TABLE "public"."orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';
COMMIT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "shipping_address" JSONB NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';
