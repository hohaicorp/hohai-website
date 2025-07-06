-- CreateTable
CREATE TABLE "ScheduledMeet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "mode" TEXT NOT NULL,
    "notes" TEXT,
    "meetingLink" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScheduledMeet_pkey" PRIMARY KEY ("id")
);
