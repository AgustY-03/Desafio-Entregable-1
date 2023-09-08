import { Router } from "express";
import ProductManager from "../dao/managers/ProductManager.js";

const productsRouter = Router();
const PM = new ProductManager();

//creo el endpoint /products y /products?limit=n
productsRouter.get("/", async (req, res) => {
  const products = await PM.getProducts();
  let limit = +req.query.limit;
  res.send({ Products: limit ? products.slice(0, limit) : products });
});

//creo el endpoint POST raiz
productsRouter.post("/", async (req, res) => {
  let { title, description, code, price, status, stock, category, thumbnails } =
    req.body;

  //valido que todos los campos sean obligatorios y correctos
  if (!title) {
    return res
      .status(400)
      .send({ status: "error", message: "The 'title' is a mandatory field" });
  } else if (!description) {
    return res
      .status(400)
      .send({
        status: "error",
        message: "The 'description' is a mandatory field",
      });
  } else if (!code) {
    return res
      .status(400)
      .send({ status: "error", message: "The 'code' is a mandatory field" });
  } else if (!price) {
    return res
      .status(400)
      .send({ status: "error", message: "The 'price' is a mandatory field" });
  } else if (!status) {
    return res
      .status(400)
      .send({ status: "error", message: "The 'status' is a mandatory field" });
  } else if (!category) {
    return res
      .status(400)
      .send({
        status: "error",
        message: "The 'category' is a mandatory field",
      });
  }

  //agrego el producto
  const result = await PM.addProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  });
  if (result) {
    res.send({ status: "success", message: "Product added successfully" });
  } else {
    res
      .status(500)
      .send({ status: "error", message: "Error! Product could not be added!" });
  }
});

//creo el endpoint /products/id como parametro
productsRouter.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  const result = await PM.getProductById(id);
  res.send({ Product: result });
});

productsRouter.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const product = req.body;
  //actualizo el producto
  const result = await PM.updateProduct(id, product);
  if (result) {
    res.send({ status: "success", message: "Product updated successfully" });
  } else {
    res.status(500).send({
      status: "error",
      message: "Error! Product could not be updated!",
    });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const result = await PM.deleteProduct(id);
  //elimino el producto
  if (result) {
    res.send({ status: "success", message: "Product deleted successfully" });
  } else {
    res.status(500).send({
      status: "error",
      message: "Error! Product could not be deleted!",
    });
  }
});

export default productsRouter;
