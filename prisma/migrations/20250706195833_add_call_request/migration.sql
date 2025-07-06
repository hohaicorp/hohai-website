/*
  Warnings:

  - You are about to drop the `ScheduledMeet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ScheduledMeet";

-- CreateTable
CREATE TABLE "CallRequest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "enquiry" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CallRequest_pkey" PRIMARY KEY ("id")
);
