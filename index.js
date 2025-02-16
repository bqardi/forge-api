import express from "express";
import apiRoutes from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
