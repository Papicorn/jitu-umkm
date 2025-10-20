import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    database: process.env.MYSQL_DB ?? "jitu",
    username: process.env.MYSQL_USER ?? "root",
    password: process.env.MYSQL_PASSWORD ?? "",
    host: process.env.MYSQL_HOST ?? "localhost",
    port: Number(process.env.MYSQL_PORT ?? 3306),
    dialect: "mysql",
    logging: false,
});