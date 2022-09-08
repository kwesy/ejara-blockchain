/*
  Warnings:

  - You are about to drop the `Bock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Bock";

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "block" JSONB NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);
