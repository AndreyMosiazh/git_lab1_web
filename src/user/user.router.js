const express = require('express');
const db = require('../db');
const { users } = require('../db/schema');
const router = express.Router();
const { eq } = require('drizzle-orm');
const { products } = require('../db/schema'); 

// handle get request for path /users

router.post('/', async (request, response) => {
   const { body } = request;
   await db.insert(users).values(body);
   return response.sendStatus(201);
});

router.get('/', async (request, response) => {
   const users = await db.query.users.findMany();
   return response.json(users);
});

router.get('/:id/products', async (request, response) => {
    const { id } = request.params; 
        const userProducts = await db.query.products.findMany({
        
        where: eq(products.userId, +id) 
    });
    
    return response.json(userProducts);
});

module.exports = router;