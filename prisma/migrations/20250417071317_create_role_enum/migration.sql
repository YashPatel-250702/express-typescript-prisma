-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Batsman', 'Bowler', 'AllRounder', 'WicketKeeper');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Batsman';
