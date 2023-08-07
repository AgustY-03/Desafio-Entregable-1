import express from 'express';
import fs from 'fs';
import { ProductManager } from './ProductManager.js';

// Funciones

const path = './src/archivo/products.json';

const consultProduct = async () => {
    if(fs.existsSync(path)){
        const data = await fs.promises.readFile(path, 'utf-8');
        const products = JSON.parse(data);
        return products;
    }
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server funcionando');
})

app.get('/products', async (req, res) => {
    const productsList = await consultProduct();
    const limit = req.query.limit;
    if(limit){
        const productLimit = productsList.filter( (e) => e.id <= limit)
        res.send({productLimit});
        return;
    }

    res.send({productsList});
})

app.get('/products/:pid', async (req, res) => {
    const productsList = await consultProduct();

    let pid = +req.params.pid;
    let producto = productsList.find( (e) => e.id === pid);

    if(!producto){
        res.send({ error: 'El producto no fue encontrado' });
        return;
    }

    res.send({producto});
})

app.listen(8080, () => {
    console.log('Server funcionando en port 8080');
})