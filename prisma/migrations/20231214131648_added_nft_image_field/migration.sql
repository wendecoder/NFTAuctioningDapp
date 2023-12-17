-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nftTokenId" INTEGER NOT NULL,
    "highestBidder" TEXT,
    "highestBid" INTEGER,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "status" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nftTokenId_key" ON "User"("nftTokenId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
