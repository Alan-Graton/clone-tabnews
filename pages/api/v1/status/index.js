import database from "infra/database.js";

export default async function status(req, res) {
  const result = await database.query("SELECT 1 + 1 as Result;");
  console.log("Database connection test result: ", result);

  res.status(200).json({ version: "v1" });
}
