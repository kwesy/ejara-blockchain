-- CreateTable
CREATE TABLE "BlockHash" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "BlockHash_pkey" PRIMARY KEY ("id")
);
