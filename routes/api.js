// routes/api.js
const express = require('express');
const router = express.Router();
const dal = require('../models/dal');

// API route to get all products
router.get('/products', async (req, res) => {
    const products = await dal.getProducts();
    res.json(products);
});

// API route to create a product
router.post('/products', async (req, res) => {
    const { name, price, description } = req.body;
    const product = await dal.createProduct(name, price, description);
    res.json(product);
});

// API route to update a product
router.put('/products/:id', async (req, res) => {
    const { name, price, description } = req.body;
    const product = await dal.updateProduct(req.params.id, name, price, description);
    res.json(product);
});

// API route to delete a product
router.delete('/products/:id', async (req, res) => {
    await dal.deleteProduct(req.params.id);
    res.status(204).send();
});

module.exports = router;
