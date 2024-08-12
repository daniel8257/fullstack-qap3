// index.js
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const uiRoutes = require('./routes/ui');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Routes
app.use('/', uiRoutes);
app.use('/api', apiRoutes);

// Static files
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
