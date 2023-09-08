import { Router } from "express";
import ProductManager from "../dao/managers/ProductManager.js";

const router = Router();
const PM = new ProductManager();

router.get("/", async (req, res) => {
  const products = await PM.getProducts();
  res.render("home", { products, title: "Home" });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { title: "Real Time Products" });
});

router.get("/chat", (req, res) => {
  res.render("chat", { title: "Chat" });
})

export default router;
