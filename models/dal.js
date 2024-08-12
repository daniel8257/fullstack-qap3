// models/dal.js
const { Pool } = require('pg');


// const pool = new Pool(); // Configure this with your PostgreSQL credentials

// Configure the database connection
const pool = new Pool({
    user: 'postgres',          // replace with your database username
    host: 'localhost',             // replace with your database host
    database: 'products',      // replace with your database name
    password: 'Keyin2021',      // replace with your database password
    port: 5432,                    // replace with your database port (default: 5432)
});



// Get all products
const getProducts = async () => {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
};

// Get a single product by ID
const getProductById = async (id) => {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
};

// Create a new product
const createProduct = async (name, price, description) => {
    const result = await pool.query(
        'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *',
        [name, price, description]
    );
    return result.rows[0];
};

// Update a product
const updateProduct = async (id, name, price, description) => {
    const result = await pool.query(
        'UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *',
        [name, price, description, id]
    );
    return result.rows[0];
};

// Delete a product
const deleteProduct = async (id) => {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
