/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `dropOffContactId` on the `Waiver` table. All the data in the column will be lost.
  - You are about to drop the column `pickUpContactId` on the `Waiver` table. All the data in the column will be lost.
  - Added the required column `dropOffContact` to the `Waiver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpContact` to the `Waiver` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Contact";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Waiver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isUserContact" BOOLEAN NOT NULL,
    "pickUpContact" TEXT NOT NULL,
    "dropOffContact" TEXT NOT NULL,
    "pickUpDate" DATETIME NOT NULL,
    "pickUpAddress" TEXT NOT NULL,
    "pickUpCity" TEXT NOT NULL,
    "pickUpState" TEXT NOT NULL,
    "pickUpZip" TEXT NOT NULL,
    "dropOffAddress" TEXT NOT NULL,
    "dropOffCity" TEXT NOT NULL,
    "dropOffState" TEXT NOT NULL,
    "dropOffZip" TEXT NOT NULL,
    "agreedBidAmount" TEXT NOT NULL,
    "cogginsHealthCert" BOOLEAN NOT NULL,
    "terms" BOOLEAN NOT NULL,
    "comments" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_Waiver" ("agreedBidAmount", "cogginsHealthCert", "comments", "createdAt", "deletedAt", "dropOffAddress", "dropOffCity", "dropOffState", "dropOffZip", "email", "firstName", "id", "isUserContact", "lastName", "phone", "pickUpAddress", "pickUpCity", "pickUpDate", "pickUpState", "pickUpZip", "terms", "updatedAt") SELECT "agreedBidAmount", "cogginsHealthCert", "comments", "createdAt", "deletedAt", "dropOffAddress", "dropOffCity", "dropOffState", "dropOffZip", "email", "firstName", "id", "isUserContact", "lastName", "phone", "pickUpAddress", "pickUpCity", "pickUpDate", "pickUpState", "pickUpZip", "terms", "updatedAt" FROM "Waiver";
DROP TABLE "Waiver";
ALTER TABLE "new_Waiver" RENAME TO "Waiver";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
