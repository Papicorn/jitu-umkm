import express, { Request, Response, NextFunction } from "express";
import pool from "./config/db";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from TypeScript Express backend!" });
});

app.get("/users", async (_req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM consignors");
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`);
});
