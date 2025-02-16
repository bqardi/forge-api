import express from "express";
import apiRoutes from "./routes/api.js";
import { initDb } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 8000;

initDb();

app.use(express.json());
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
