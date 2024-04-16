const { db } = require('@vercel/postgres');

// const bcrypt = require('bcrypt');

const articles = [
  { title: "Example1", content: "this is an article" },
  { title: "Example2", content: "this is an article too" },
];
async function seedArticle(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "article" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS article (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content VARCHAR(255) NOT NULL,
        starNum INT DEFAULT 0
      );
    `;

    console.log(`Created "article" table`);

    // Insert data into the "article" table
    const insertedArticle = await Promise.all(
      articles.map(
        (rev) => client.sql`
        INSERT INTO article (title, content)
        VALUES (${rev.title}, ${rev.content})
      `
      )
    );

    console.log(`Seeded ${insertedArticle.length} article`);

    return {
      createTable,
      article: insertedArticle,
    };
  } catch (error) {
    console.error("Error seeding article:", error);
    throw error;
  }
}

async function createFavorite(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "article" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS favorite (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        userId VARCHAR(255) NOT NULL,
        articleId VARCHAR(255) NOT NULL
      );
    `;
    console.log(`created favorite`);
    return {
      createTable
    };
  } catch (error) {
    console.error("Error create favorite:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedArticle(client);
  await createFavorite(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
