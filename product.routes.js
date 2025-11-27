const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

router.get('/products', (request, response) => {
   return response.json(products);
});


router.get('/products/:id', (request, response, next) => {
   const { id } = request.params;

   
   if (!/^\d+$/.test(id)) {
       return next();
   }
   
   const product = products.find(p => p.id === parseInt(id));

   if (product) {
       response.json(product);
   } else {
       response.status(404).send('Product not found');
   }
});

router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params;

   const filteredProducts = products.filter(product => product.brand === brand);

   response.json(filteredProducts);
});

router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ")
   err.statusCode = 400
   throw err
});

module.exports = router;