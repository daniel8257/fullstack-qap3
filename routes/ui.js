// routes/ui.js
const express = require('express');
const router = express.Router();
const dal = require('../models/dal');

// Index route to list all products
router.get('/', async (req, res) => {
    const products = await dal.getProducts();
    res.render('index', { products });
});

// Show route to display a single product
router.get('/products/:id', async (req, res) => {
    const product = await dal.getProductById(req.params.id);
    res.render('show', { product });
});

// Edit form route
router.get('/products/:id/edit', async (req, res) => {
    const product = await dal.getProductById(req.params.id);
    res.render('edit', { product });
});

// Update product
router.put('/products/:id', async (req, res) => {
    const { name, price, description } = req.body;
    try {
        await dal.updateProduct(req.params.id, name, price, description);
        res.redirect(`/products/${req.params.id}`);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add more routes as needed

module.exports = router;
