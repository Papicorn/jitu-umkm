import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { sequelize } from "./config/sequelize";

// ROUTER
import consignorRoutes from "./routes/consignorRoutes";
import storeRoutes from "./routes/storeRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/v1", consignorRoutes, storeRoutes, productRoutes);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");
    app.listen(port, () => {
      console.log(`Server ready at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

startServer();