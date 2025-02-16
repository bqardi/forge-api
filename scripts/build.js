import { db } from "../config/db.js";

(async function () {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS plugins (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        version VARCHAR(50),
        description TEXT NOT NULL DEFAULT '',
        download_url TEXT,
        update_url TEXT,
        author VARCHAR(255),
        author_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // If at any point the database is "reset" (deleted and recreated),
    // remove the following queries:
    await db.query(`
      ALTER TABLE plugins
      ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS download_url TEXT,
      ADD COLUMN IF NOT EXISTS update_url TEXT,
      ADD COLUMN IF NOT EXISTS author VARCHAR(255),
      ADD COLUMN IF NOT EXISTS author_url TEXT;
    `);
    // End of queries to remove

    console.log("Database tables are ready");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    db.end();
  }
})();
