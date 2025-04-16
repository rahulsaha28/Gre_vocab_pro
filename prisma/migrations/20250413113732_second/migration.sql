-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vocabulary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL,
    "meaning" JSONB,
    "example" JSONB,
    "synonyms" JSONB,
    "similarwords" JSONB,
    "status" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "favarable" BOOLEAN NOT NULL DEFAULT false,
    "rate" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Vocabulary" ("createdAt", "example", "id", "meaning", "rate", "similarwords", "status", "synonyms", "updatedAt", "word") SELECT "createdAt", "example", "id", "meaning", "rate", "similarwords", "status", "synonyms", "updatedAt", "word" FROM "Vocabulary";
DROP TABLE "Vocabulary";
ALTER TABLE "new_Vocabulary" RENAME TO "Vocabulary";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
