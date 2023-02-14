import express from 'express';
import * as productController  from './products.controller.js';

const productRouter = express.Router();

productRouter.post('/products/addProduct', productController.addProduct);
productRouter.put('/products/updateProduct', productController.updateProduct);
productRouter.delete('/products/deleteProduct', productController.deleteProduct);
productRouter.get('/products' , productController.getAllProducts)
productRouter.post('/products/searchPrice' , productController.searchedProductByPrice)

productRouter.get('/alluserProducts' , productController.allUserWithProductsAndwithoutIt)
productRouter.get('/userProductsOnly' , productController.userWhomeHasProductsOnly)

export default productRouter;