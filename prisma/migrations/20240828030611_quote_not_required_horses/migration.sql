-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Horse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quoteId" TEXT,
    "tripId" TEXT,
    "waiverId" TEXT,
    CONSTRAINT "Horse_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Horse_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Horse_waiverId_fkey" FOREIGN KEY ("waiverId") REFERENCES "Waiver" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Horse" ("age", "breed", "createdAt", "gender", "height", "id", "name", "quoteId", "tripId", "updatedAt", "waiverId") SELECT "age", "breed", "createdAt", "gender", "height", "id", "name", "quoteId", "tripId", "updatedAt", "waiverId" FROM "Horse";
DROP TABLE "Horse";
ALTER TABLE "new_Horse" RENAME TO "Horse";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
