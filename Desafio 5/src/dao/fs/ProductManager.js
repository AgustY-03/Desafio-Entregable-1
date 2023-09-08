import fs from "fs";

class ProductManager {
  //defino el constructor
  constructor() {
    this.products = [];
    this.path = "Products.json";
    this.createFile();
  }
  //inicializo el Products.json con un metodo createFile()
  createFile() {
    if (!fs.existsSync(this.path)) {
      this.saveProductsInJSON();
    }
  }

  //Método addProduct
  addProduct(product) {
    //valido que no se repita el campo "code."
    const noDupCode = this.products.some((prod) => prod.code === product.code);
    if (noDupCode) {
      console.error(`Error: product code "${code}" already exists`);
      return false; //respuesta para el endpoint
    }

    //Genero el ID
    let id = this.products.length + 1;
    //creo el producto
    const newProduct = {
      id: id,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: true,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails,
    };
    //pusheo el array
    this.products.push(newProduct);
    //guardo como un array en el archivo Products.json
    this.saveProductsInJSON();
    return true; //respuesta para el endpoint
  }

  //Método getProducts
  getProducts() {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    return this.products;
  }

  //Método getProductById
  getProductById(id) {
    const products = this.getProducts();
    return (
      products.find((prod) => prod.id === id) || console.error("Not found")
    );
  }

  deleteProduct(id) {
    this.products = this.getProducts();
    const product = this.getProductById(id);
    if (!product) {
      console.error(`The product id: ${id} does not exist`);
      return false; //respuesta para el endpoint
    } else {
      this.products = this.products.filter((prod) => prod.id !== product.id);
      this.saveProductsInJSON();
      console.log(`Product id: ${product.id} has been deleted`);
      return true; //respuesta para el endpoint
    }
  }

  updateProduct(id, product) {
    this.products = this.getProducts();
    let position = this.products.findIndex((prod) => prod.id === id);

    if (position === -1) {
      console.error(`The product id: ${id} does not exist`);
      return false; //respuesta para el endpoint
    } else {
      this.products[position].title = product.title;
      this.products[position].description = product.description;
      this.products[position].code = product.code;
      this.products[position].price = product.price;
      this.products[position].status = product.status;
      this.products[position].stock = product.stock;
      this.products[position].category = product.category;
      this.products[position].thumbnails = product.thumbnails;
      this.saveProductsInJSON();
      console.log("Product updated!");
      return true;
    }
  }

  saveProductsInJSON() {
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }
}

export default ProductManager;
