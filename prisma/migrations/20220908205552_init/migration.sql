-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "block" JSONB NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockHash" (
    "id" SERIAL NOT NULL,
    "hash" TEXT[],

    CONSTRAINT "BlockHash_pkey" PRIMARY KEY ("id")
);
