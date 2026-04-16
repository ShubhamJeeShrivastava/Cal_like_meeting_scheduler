// Import the Neon serverless client for PostgreSQL
import { neon } from "@neondatabase/serverless"
// Import Drizzle's Neon HTTP driver for ORM support
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http"

// Import your database schema definitions (e.g., tables) from the local schema file
import * as schema from "./schema"

type Db = NeonHttpDatabase<typeof schema>

let _db: Db | null = null

export function getDb() {
  if (_db) return _db

  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment variables (Vercel Project Settings → Environment Variables)."
    )
  }

  const sql = neon(databaseUrl)
  _db = drizzle(sql, { schema })
  return _db
}

