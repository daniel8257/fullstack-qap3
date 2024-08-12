// routes/ui.js
const express = require('express');
const router = express.Router();
const dal = require('../models/dal');

// Index route to list all products
router.get('/', async (req, res) => {
    try {
        const products = await dal.getProducts();
        res.render('index', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to show the form for adding a new product
router.get('/products/new', (req, res) => {
    res.render('new'); // This should render a form for creating a new product
});

// Route to handle creating a new product (INSERT)
router.post('/products', async (req, res) => {
    const { name, price, description } = req.body;
    try {
        await dal.createProduct(name, price, description);
        res.redirect('/');
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Show route to display a single product (SELECT)
router.get('/products/:id', async (req, res) => {
    try {
        const product = await dal.getProductById(parseInt(req.params.id));
        res.render('show', { product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Edit form route (SELECT)
router.get('/products/:id/edit', async (req, res) => {
    try {
        const product = await dal.getProductById(parseInt(req.params.id));
        res.render('edit', { product });
    } catch (error) {
        console.error('Error fetching product for edit:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Update product (UPDATE)
router.put('/products/:id', async (req, res) => {
    const { name, price, description } = req.body;
    try {
        await dal.updateProduct(parseInt(req.params.id), name, price, description);
        res.redirect(`/products/${req.params.id}`);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete product (DELETE)
router.delete('/products/:id', async (req, res) => {
    try {
        await dal.deleteProduct(parseInt(req.params.id));
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
