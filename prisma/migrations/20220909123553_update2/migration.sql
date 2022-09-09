/*
  Warnings:

  - You are about to drop the column `block` on the `Block` table. All the data in the column will be lost.
  - Added the required column `average` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `median` to the `Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min` to the `Block` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "block",
ADD COLUMN     "average" INTEGER NOT NULL,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "max" INTEGER NOT NULL,
ADD COLUMN     "median" INTEGER NOT NULL,
ADD COLUMN     "min" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BlockHash" ALTER COLUMN "hash" SET DATA TYPE TEXT;
