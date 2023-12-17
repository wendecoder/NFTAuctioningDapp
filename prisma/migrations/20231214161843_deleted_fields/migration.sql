/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nftTokenId" INTEGER NOT NULL,
    "highestBidder" TEXT,
    "highestBid" INTEGER,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "startingPrice" INTEGER,
    "status" TEXT,
    "nftImage" BLOB
);
INSERT INTO "new_User" ("endTime", "highestBid", "highestBidder", "id", "nftImage", "nftTokenId", "startTime", "startingPrice", "status") SELECT "endTime", "highestBid", "highestBidder", "id", "nftImage", "nftTokenId", "startTime", "startingPrice", "status" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_nftTokenId_key" ON "User"("nftTokenId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
