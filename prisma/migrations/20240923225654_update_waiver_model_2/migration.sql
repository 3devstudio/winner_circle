/*
  Warnings:

  - You are about to drop the column `dropOffPhone` on the `Waiver` table. All the data in the column will be lost.
  - You are about to drop the column `pickUpPhone` on the `Waiver` table. All the data in the column will be lost.
  - Added the required column `dropOffContactPhone` to the `Waiver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpContactPhone` to the `Waiver` table without a default value. This is not possible if the table is not empty.

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
    "pickUpContactPhone" TEXT NOT NULL,
    "dropOffAddress" TEXT NOT NULL,
    "dropOffCity" TEXT NOT NULL,
    "dropOffState" TEXT NOT NULL,
    "dropOffZip" TEXT NOT NULL,
    "dropOffContactName" TEXT NOT NULL,
    "dropOffContactPhone" TEXT NOT NULL,
    "agreedBidAmount" TEXT NOT NULL,
    "cogginsHealthCert" BOOLEAN NOT NULL,
    "terms" BOOLEAN NOT NULL,
    "comments" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_Waiver" ("agreedBidAmount", "cogginsHealthCert", "comments", "createdAt", "deletedAt", "dropOffAddress", "dropOffCity", "dropOffContactName", "dropOffState", "dropOffZip", "email", "firstName", "id", "lastName", "phone", "pickUpAddress", "pickUpCity", "pickUpContactName", "pickUpDate", "pickUpState", "pickUpZip", "terms", "updatedAt") SELECT "agreedBidAmount", "cogginsHealthCert", "comments", "createdAt", "deletedAt", "dropOffAddress", "dropOffCity", "dropOffContactName", "dropOffState", "dropOffZip", "email", "firstName", "id", "lastName", "phone", "pickUpAddress", "pickUpCity", "pickUpContactName", "pickUpDate", "pickUpState", "pickUpZip", "terms", "updatedAt" FROM "Waiver";
DROP TABLE "Waiver";
ALTER TABLE "new_Waiver" RENAME TO "Waiver";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
