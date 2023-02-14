import express from 'express';
import  userRouter  from './src/modules/users/users.router.js';
import productRouter from './src/modules/products/products.router.js';
import { createDb } from './databases/dbConnection.js';

const app = express()
const port = 3000
app.use(express.json());

app.use(userRouter);  /// 

app.use(productRouter);

createDb();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
