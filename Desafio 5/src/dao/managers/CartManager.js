import { cartModel } from "../models/cart.model.js";

class CartManager {
  async newCart() {
    try {
      await cartModel.create({ products: [] });
      console.log("New Cart created successfully!");
      return true;
    } catch (error) {
      console.log("Failed to create new cart");
      return false;
    }
  }
  //#Create
  async addProductToCart(cid, pid) {
    try {
      if (this.validateId(cid)) {
        const cart = await this.getCartById(cid);
        const product = cart.products.find((prod) => prod.product === pid);
        if (!cart) {
          return false;
        }
        //si el producto ya existe en el carrito seleccionado
        if (product) {
          product.quantity += 1;
        } else {
          cart.products.push({ product: pid, quantity: 1 });
        }
        await cartModel.updateOne({ _id: cid }, cart);
        console.log("Cart updated!");
        return true; //respuesta para el endpoint
      } else {
        console.error(`The id: ${cid} or ${pid} is not a Mongo valid id`);
        return false;
      }
    } catch (error) {
      console.log("Not found!");
      return false;
    }
  }
  //#Read
  async getCarts() {
    return await cartModel.find().lean();
  }

  async getCartById(id) {
    if (this.validateId(id)) {
      return (await cartModel.findOne({ _id: id }).lean()) || null;
    } else {
      console.log("Not found!");
      return null;
    }
  }

  //#Auxiliares
  validateId(id) {
    return id.length === 24 ? true : false; // 24 es la cantidad de caracteres que tiene un id de mongo, entonces valido esto para saber si es un id de mongo o no
  }
}

export default CartManager;
