/*
  Warnings:

  - Added the required column `birthDate` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `Passenger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL;
