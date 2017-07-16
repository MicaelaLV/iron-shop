// routes/products.js

const express = require('express');
const Product = require('../models/product');

const router  = express.Router();

router.get('/', (req, res, next) => {
  Product.find({}, (err, products) => {
    if (err) { return next(err) }
    
    res.render('products/index', {
      products: products
    });
  });
});

/* other routes */

router.get('/new', (req, res, next) => {
  res.render('products/new');
});

router.post('/', (req, res, next) => {
  // Take the params, and translate them into a new object
  const productInfo = {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description
  };
  
  // Create a new Product with the params
  const newProduct = new Product(productInfo);

});

router.post('/', (req, res, next) => {
  /* ...other code... */
  const newProduct = new Product(productInfo);
  // Save the product to the DB
  newProduct.save( (err) => {
    if (err) { return next(err) }
    // redirect to the list of products if it saves
    return res.redirect('/products');
  });
});

module.exports = router;