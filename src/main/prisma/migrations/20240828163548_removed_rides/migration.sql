/*
  Warnings:

  - You are about to drop the `Ride` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_passengerId_fkey";

-- DropTable
DROP TABLE "Ride";
