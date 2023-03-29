import express from "express";
import ProductManager from "./manager/ProductManager.js";
//Llamamos a express() para crear la app
const app = express();
//Guardamos constante puertos en 8080
const port = 8080;

//Hacemos un listening de la app en los puertos indicados (8080)
app.listen(process.env.port || port, () => console.log('Server listening on port: (8080)'))

const productManager = new ProductManager('./src/files/Products.json')

//Get de todos los productos.
app.get('/products', async (req, res) => {
    const products = await productManager.getProducts()
    res.send(products)
})

//Get de un producto en especifico pasado por parametro en el endpoint
app.get('/products/:pid', async (req, res) => {
    let pid = req.params.pid
    let products = await productManager.getProducts()
    let product = products.find(product => product.id === parseInt(pid))
    if (!product) return res.send({ error: 'Product not found.' })
    res.send({ product })
})
