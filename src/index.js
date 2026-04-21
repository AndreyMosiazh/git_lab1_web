const express = require('express');
const userRouter = require('./user/user.router.js');
const productRouter = require('./product/product.router');
const { logRequest } = require('./middleware');
const bodyParser = require('body-parser');
const { errorResponder } = require('./error.middleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(logRequest);
//app.use(productRouter);

app.use('/products', productRouter);

//app.use(userRouter);

app.use('/users', userRouter);

app.use(errorResponder);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});