/*
  Warnings:

  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `thumbnail` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Tech', 'Marketing', 'Politics', 'Entertainment', 'Business', 'Life');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "Category" NOT NULL,
ALTER COLUMN "thumbnail" SET NOT NULL;
