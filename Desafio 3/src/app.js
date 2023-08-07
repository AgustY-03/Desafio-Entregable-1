import express from 'express';
import { ProductManager } from './ProductManager.js';

// Funciones

const manejadorDeProductos = new ProductManager();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server funcionando');
})

app.get('/products', async (req, res) => {
    const productsList = await manejadorDeProductos.consultProduct();
    const limit = req.query.limit;
    if(limit){
        const productLimit = productsList.filter( (e) => e.id <= limit)
        res.send({productLimit});
        return;
    }

    res.send({productsList});
})

app.get('/products/:pid', async (req, res) => {
    const productsList = await manejadorDeProductos.consultProduct();

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