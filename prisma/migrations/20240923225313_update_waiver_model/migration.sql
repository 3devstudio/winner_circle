/*
  Warnings:

  - You are about to drop the column `dropOffContact` on the `Waiver` table. All the data in the column will be lost.
  - You are about to drop the column `isUserContact` on the `Waiver` table. All the data in the column will be lost.
  - You are about to drop the column `pickUpContact` on the `Waiver` table. All the data in the column will be lost.
  - Added the required column `dropOffContactName` to the `Waiver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropOffPhone` to the `Waiver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpContactName` to the `Waiver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpPhone` to the `Waiver` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Waiver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pickUpDate" DATETIME NOT NULL,
    "pickUpAddress" TEXT NOT NULL,
    "pickUpCity" TEXT NOT NULL,
    "pickUpState" TEXT NOT NULL,
    "pickUpZip" TEXT NOT NULL,
    "pickUpContactName" TEXT NOT NULL,
    "pickUpPhone" TEXT NOT NULL,
    "dropOffAddress" TEXT NOT NULL,
    "dropOffCity" TEXT NOT NULL,
    "dropOffState" TEXT NOT NULL,
    "dropOffZip" TEXT NOT NULL,
    "dropOffContactName" TEXT NOT NULL,
    "dropOffPhone" TEXT NOT NULL,
    "agreedBidAmount" TEXT NOT NULL,
    "cogginsHealthCert" BOOLEAN NOT NULL,
    "terms" BOOLEAN NOT NULL,
    "comments" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_Waiver" ("agreedBidAmount", "cogginsHealthCert", "comments", "createdAt", "deletedAt", "dropOffAddress", "dropOffCity", "dropOffState", "dropOffZip", "email", "firstName", "id", "lastName", "phone", "pickUpAddress", "pickUpCity", "pickUpDate", "pickUpState", "pickUpZip", "terms", "updatedAt") SELECT "agreedBidAmount", "cogginsHealthCert", "comments", "createdAt", "deletedAt", "dropOffAddress", "dropOffCity", "dropOffState", "dropOffZip", "email", "firstName", "id", "lastName", "phone", "pickUpAddress", "pickUpCity", "pickUpDate", "pickUpState", "pickUpZip", "terms", "updatedAt" FROM "Waiver";
DROP TABLE "Waiver";
ALTER TABLE "new_Waiver" RENAME TO "Waiver";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
