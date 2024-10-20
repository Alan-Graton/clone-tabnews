import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();

  try {
    const result = await client.query(queryObject);

    return result.rows;
  } catch (error) {
    console.error("[database] Query execution FAILED: ", error);
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
