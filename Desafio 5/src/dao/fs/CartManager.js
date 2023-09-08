import fs from "fs";

class CartManager {
  //defino el constructor
  constructor() {
    this.carts = [];
    this.path = "Carts.json";
    this.createFile();
  }
  //inicializo el Carts.json con un metodo createFile()
  createFile() {
    if (!fs.existsSync(this.path)) {
      this.saveCartsInJSON();
    }
  }

  //Método newCart
  newCart() {
    //genero el id
    this.carts = this.getCarts();
    let id = this.carts.length + 1;
    this.carts.push({ id, products: [] });
    this.saveCartsInJSON();
    return true; //respuesta al endpoint
  }

  //Método getCarts
  getCarts() {
    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    return this.carts;
  }

  //Método getCartById
  getCartById(id) {
    const carts = this.getCarts();
    return carts.find((cart) => cart.id === id) || console.error("Not found");
  }

  addProductToCart(cid, pid) {
    this.carts = this.getCarts();
    const cart = this.carts.find((cart) => cart.id === cid);
    if (!cart) {
      return false;
    }

    let product = cart.products.find((prod) => prod.product === pid);

    //si el producto ya existe en el carrito seleccionado
    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    this.saveCartsInJSON();
    console.log("Cart updated!");
    return true; //respuesta para el endpoint
  }

  saveCartsInJSON() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts));
  }
}

export default CartManager;
