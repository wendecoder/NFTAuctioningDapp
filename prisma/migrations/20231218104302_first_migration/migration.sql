-- CreateTable
CREATE TABLE "User" (
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

-- CreateIndex
CREATE UNIQUE INDEX "User_nftTokenId_key" ON "User"("nftTokenId");
