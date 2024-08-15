-- CreateTable
CREATE TABLE "Waiver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isUserContact" BOOLEAN NOT NULL,
    "pickUpContactId" TEXT,
    "dropOffContactId" TEXT,
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
    CONSTRAINT "Waiver_pickUpContactId_fkey" FOREIGN KEY ("pickUpContactId") REFERENCES "Contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Waiver_dropOffContactId_fkey" FOREIGN KEY ("dropOffContactId") REFERENCES "Contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
