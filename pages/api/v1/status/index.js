import database from "infra/database.js";

export default async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const [dbVersion] = await database.query("SHOW server_version;");
  const [dbMaxConnections] = await database.query("SHOW max_connections;");
  const [dbOpenConnections] = await database.query({
    text: "SELECT count(*)::int as open_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersion.server_version,
        max_connections: parseInt(dbMaxConnections.max_connections),
        open_connections: dbOpenConnections.open_connections,
      },
    },
  });
}
