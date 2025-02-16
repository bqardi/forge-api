import express from "express";
import pluginsRoutes from "./plugins.js";

const router = express.Router();

router.use("/plugins", pluginsRoutes);

export default router;
