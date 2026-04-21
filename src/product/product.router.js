const express = require('express');
const db = require('../db');
const { products } = require('../db/schema');
const router = express.Router();

router.post('/', async (request, response) => {
   const { body } = request;
   await db.insert(products).values(body);
   return response.sendStatus(201);
});

router.get('/', async (request, response) => {
    const allProducts = await db.query.products.findMany();
    return response.json(allProducts);
});

module.exports = router;