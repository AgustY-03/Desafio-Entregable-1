const fs = require('fs');

class ProductManager {

    constructor () {
        this.products = []
        this.idCounter = 1;
        this.path = './json/products.json';
    }

    consultProduct = async () => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        }
    }

    getProducts = async () => {
        const arrayProducts = await this.consultProduct()
        console.log(arrayProducts)
    }

    addProducts = async (title, description, price, thumbnail, code, stock) => {
        try {

            if(!title || !description || !price || !thumbnail || !code || !stock){
                console.error('Todos los campos son obligatorios');
                return;
            }
    
            if(fs.existsSync(this.path)){
                // Cuando el archivo .json ya esta creado
                const data = await this.consultProduct();

                const validatingCode = data.findIndex( (i) => i.code === code );
                if(validatingCode !== -1){
                    console.error('El codigo del producto ya existe');
                return;
                }

                data.map( e => {
                    this.idCounter++;
                });

                const product = {
                    id: this.idCounter,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }

                const productsFile = await this.consultProduct();
                productsFile.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                
            }else{
                // Para crear el archivo .json
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
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            }
        } catch (error) {
            throw new Error(error);
        }

    }

    getProductsById = async (idProduct) => {
        try {
            const getProducts = await this.consultProduct();
            const productIndex = getProducts.findIndex( (e) => e.id === idProduct );
            if(productIndex === -1){
                console.log(`ID ${idProduct} NOT FOUND`);
                return;
            }

            const productChoosen = getProducts[productIndex];
            console.log(productChoosen);
            return;
        } catch (error) {
            throw new Error(error);
        }
    }

    updateProduct = async (idProduct, data) => {
		try {
			const updateProducts = await this.consultProduct();

			const productIndex = updateProducts.findIndex((e) => e.id === idProduct);
			if (productIndex === -1) {
				console.log(`ID ${idProduct} NOT FOUND`);
                return;
			}

            if(!data.title || !data.description || !data.price || !data.thumbnail || !data.code || !data.stock){
                console.error('Todos los campos son obligatorios');
                return;
            }

            const validatingCode = updateProducts.findIndex( (i) => i.code === data.code );
            if(validatingCode !== -1){
                console.error('El codigo del producto ya existe');
                return;
            }

            updateProducts[productIndex] = {
                ...updateProducts[productIndex],
                ...data,
            };
            console.log(`El producto del ID: ${productIndex}, ha sido actualizado`);
            await fs.promises.writeFile(this.path, JSON.stringify(updateProducts));
		} catch (error) {
			console.log(error);
		}
	}

    deleteProduct = async (idProduct) => {
        try {
            const productToDelete = await this.consultProduct();
                const productIndex = productToDelete.findIndex((e) => e.id === idProduct);
            if (productIndex === -1) {
			    console.log(`ID ${idProduct} NOT FOUND`);
                return;
		    }
            productToDelete.splice(productIndex, 1);
            productToDelete.map( (e) =>{
                if(e.id > productIndex){
                    e.id--;
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(productToDelete));
        } catch (error) {
            throw new Error(error);
        }

    }

}

const data = {
    title: 'Banana',
    description: '1kg de banana',
    price: '$400',
    thumbnail: 'banana.png',
    code: 'SOXZ284IXJ',
    stock: '362'
}

const manejadorDeProductos = new ProductManager();
manejadorDeProductos.addProducts('Tomate','1kg de tomate fresco','$200','tomate-fresco.png','AIEJ4291JSNC','500');
manejadorDeProductos.addProducts('Manzana','2kg de manzanas','$400','manzana.png','SICK218SKX','300');
manejadorDeProductos.getProductsById(2);
manejadorDeProductos.getProducts();
manejadorDeProductos.updateProduct(2, data);
manejadorDeProductos.deleteProduct(1);