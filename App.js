const express = require('express');
const fs = require('fs').promises; // Usar fs.promises para leer el archivo con promesas
const app = express();

// Importa la clase ProductManager
const ProductManager = require('./ProductManager');
const productManager = new ProductManager('productos.json');

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        let limit = req.query.limit; // Obtener el parámetro de límite de resultados
        let products = await productManager.getProduct(); // Obtiene todos los productos
        if (limit) {
            products = products.slice(0, limit); // Limita el número de productos devueltos
        }
        res.json(products); // Devuelve los productos como JSON
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para conseguir un producto por ID
app.get('/products/:pid', async (req, res) => {
    try {
        let pid = parseInt(req.params.pid); // Obtener el ID del producto de los parámetros de la URL
        let product = await productManager.getProductById(pid); // Obtener el producto por ID
        if (product) {
            res.json(product); // Devolver el producto como JSON
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Puerto donde se ejecuta el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
