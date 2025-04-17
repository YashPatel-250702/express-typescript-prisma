-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "jersyNo" INTEGER NOT NULL,
    "noOfMatchPlayed" INTEGER NOT NULL,
    "totalRuns" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_jersyNo_key" ON "Player"("jersyNo");
