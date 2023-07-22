class ProductManager {

    constructor () {
        this.products = []
        this.idCounter = 1;
    }

    getProducts = () => {
        return this.products;
    }

    addProducts = (title, description, price, thumbnail, code, stock) => {

        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.error('Todos los campos son obligatorios');
            return;
        }

        const validatingCode = this.products.findIndex( (i) => i.code === code );
        if(validatingCode !== -1){
            console.error('El codigo del producto ya existe');
            return;
        }

        const product = {
            id: this.idCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(product);
    }

    getProductsById = (idProduct) => {
        const productIndex = this.products.findIndex( (e) => e.id === idProduct );
        if(productIndex === -1){
            console.log('Not found');
            return;
        }

        const productChoosen = this.products[productIndex];
        console.log(`El producto buscado es ${productChoosen.title}`);
        return
    }
}

const manejadorDeProductos = new ProductManager();
manejadorDeProductos.addProducts('Tomate','1kg de tomate fresco','$200','tomate-fresco.png','AIEJ4291JSNC','500');
manejadorDeProductos.addProducts('Manzana','2kg de manzanas','$400','manzana.png','SICK218SKX','300');
manejadorDeProductos.addProducts('sandia de 3kg','$700','sandia.png','OSLZ203SOX','400');
manejadorDeProductos.addProducts('Naranja','1kg de naranjas','$300','naranja.png','SICK218SKX','600');
manejadorDeProductos.addProducts('Kiwi','2kg de kiwi','$500','kiwi.png','IRAM283AOX','800');
manejadorDeProductos.getProductsById(1);
manejadorDeProductos.getProductsById(2);
manejadorDeProductos.getProductsById(5);
manejadorDeProductos.getProductsById(3);
console.log(manejadorDeProductos.getProducts());