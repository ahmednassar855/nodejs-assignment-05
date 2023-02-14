import { checkEmailIsExist } from '../users/users.controller.js';
import { productSchema } from './../../../databases/models/product.model.js';
import { Op } from 'sequelize';
import { userSchema } from './../../../databases/models/user.model.js';

export const addProduct = async (req, res) => {
    const { pName, pDescription, price, email } = req.body;
    let checkEmail = await checkEmailIsExist(email);
    console.log(checkEmail);
    if (checkEmail) {
        let addProduct = await productSchema.create({
            pName,
            pDescription,
            price,
            createdBy: checkEmail.id
        })
        res.json({ Message: "Product Add successfully", addProduct })
    }
    else {
        res.json({ Message: "This Email is not valid", email })
    }
}

export const productId = async (pId, uId) => {
    let [productId] = await productSchema.findAll({
        where: {
            id: pId,
            createdBy: uId,
        }
    })
    if (!productId) {
        return null;
    } else {
        return productId;
    }
}

export const updateProduct = async (req, res) => {
    const { id, pName, pDescription, price, email } = req.body;
    let checkEmail = await checkEmailIsExist(email);
    // let checkProductId = await productId( id , checkEmail.id)
    if (checkEmail) {
        let checkProductId = await productId(id, checkEmail.id)
        // console.log( checkProductId.createdBy ,  checkEmail.id , "ssss");
        if (checkProductId) {
            let updateProduct = await productSchema.update({
                pName,
                pDescription,
                price
            },
                {
                    where: {
                        id: id
                    }
                }
            )
            res.json({ message: "Updated Product Successfully", updateProduct, updateProduct: { id, pName, pDescription, price } })
        } else {
            res.json({ message: "You Are Not Authirzed to update this product invalid product Id", id })
        }
    } else {
        res.json({ message: "This Email is not exist !!!!!" })
    }
}

export const deleteProduct = async (req, res) => {
    const { id, email } = req.body;
    let checkEmail = await checkEmailIsExist(email);
    // console.log(checkEmail.id , id);
    if (checkEmail) {
        let checkedProduct = await productId(id, checkEmail.id);
        console.log(checkedProduct, "ssssssss");
        if (checkedProduct) {
            console.log(checkedProduct.id, "id");
            let deletedProduct = await productSchema.destroy({
                where: {
                    id: checkedProduct.id
                }
            })

            res.json({ message: "Delete Product successfully", checkedProduct, deletedProduct })
        } else {
            res.json({ message: "You are not authorized to delete this Product", checkedProduct })
        }
    } else {
        res.json({ message: " This email is not valid!!!!" })
    }


}

export const getAllProducts = async (req, res) => {
    let allProducts = await productSchema.findAll();
    res.json({ message: "All products", allProducts })
}

export const searchedProductByPrice = async (req, res) => {
    const { price } = req.body;
    let results = await productSchema.findAll({
        where: {
            price: {
                [Op.lt]: price
            }
        }
    })
    res.json({ message: "results", results })
}


export const allUserWithProductsAndwithoutIt = async (req, res) => {
    const result = await userSchema.findAll({ include: productSchema });
    res.json({message : result})
}

export const userWhomeHasProductsOnly = async (req, res) => {
    const result = await userSchema.findAll({
         include: 
         { model : productSchema ,    
         required:true
        }}
        );
    res.json({message : result})
}