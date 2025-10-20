import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { sequelize } from "./config/sequelize";
import consignorRoutes from "./routes/consignorRoutes"

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello from TypeScript Express backend!" });
});

app.use("/consignors", consignorRoutes);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");
    // Uncomment kalau mau auto-sync schema (dev saja):
    // await sequelize.sync({ alter: true });

    app.listen(port, () => {
      console.log(`Server ready at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

startServer();