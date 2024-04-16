import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';

export async function fetchArticle() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    const data = await sql`SELECT * FROM article`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error("Failed to fetch article data.");
  }
}
