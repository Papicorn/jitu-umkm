import mysql from "mysql2/promise";
import "dotenv/config";

const host = process.env.MYSQL_HOST ?? "localhost";
const port = Number(process.env.MYSQL_PORT ?? 3306);
const user = process.env.MYSQL_USER ?? "root";
const password = process.env.MYSQL_PASSWORD ?? "";
const database = process.env.MYSQL_DB ?? "jitu";

if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_DB) {
  throw new Error("Missing required MySQL environment variables");
}

const pool = mysql.createPool({ host, port, user, password, database });

export default pool;