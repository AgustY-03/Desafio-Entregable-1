import { Router } from "express";
import CartManager from "../dao/managers/CartManager.js";

const cartsRouter = Router();
const CM = new CartManager();

//Solamente enviando POST a la raiz debe crear un carrito vacio
cartsRouter.post("/", async (req, res) => {
  const result = await CM.newCart();
  if (result) {
    res.send({ status: "success", message: "Cart created successfully!" });
  } else {
    res.status(500).send({
      status: "error",
      message: "Error! The Cart could not be created",
    });
  }
});

// get Cart por cid
cartsRouter.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await CM.getCartById(cid);
  if (!cart) {
    res
      .status(400)
      .send({ status: "error", message: "The Cart does not exists" });
    return;
  }  res.send({ products: cart.products });
});

//agrega productos al arreglo seleccionado
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const cart = await CM.getCartById(cid);
  if (!cart) {res.status(400).send({ status: "error", message: "The Cart does not exists" });
    return;
  }
  const result = await CM.addProductToCart(cid, pid);
  if (result) {
    res.send({
      status: "success",
      message: `Product ${pid} successfully added to Cart ${cid}`,
    });
  } else {
    res
      .status(500)
      .send({
        statu: "error",
        message: `Error! The product could not be added to the Cart ${cid}`,
      });
  }
});

export default cartsRouter;
