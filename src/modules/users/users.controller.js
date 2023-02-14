import { userSchema } from './../../../databases/models/user.model.js';
import { Op, where } from "sequelize";


// signup for add new user
export const singup = async (req, res) => {
    const { name, email, password, age } = req.body;
    let checkEmail = await checkEmailIsExist(email);
    console.log(checkEmail);
    if (!checkEmail) {
        let addUser = await userSchema.create({
            name,                                       // name : name , key = value >>> can make it once only
            email,
            password,
            age
        })
        res.json({ Message: "user Add successfully", addUser })
    } else {
        res.json({ message: `This email : ${email} is reserved , Try another one`, checkEmail })
    }
}
// this functinon to check email if exist or not
export const checkEmailIsExist = async (email) => {
    let [checkEmail] = await userSchema.findAll({
        where: {
            email: email
        }
    })
    if (!checkEmail) {
        return null;
    } else {
        return checkEmail.dataValues;
    }
}
// this functinon to check id if exist or not
export const checkIdIsExist = async (id) => {
    let [userId] = await userSchema.findAll({
        where: {
            id: id
        }
    })
    if (!userId) {
        return null;
    } else {
        return userId.dataValues;
    }

}

export const signIn = async (req, res) => {
    res.json({ message: "sign in" });
}

export const deleteUser = async (req, res) => {
    const { id } = req.body;
    let userId = await checkIdIsExist(id);
    // console.log(userId);
    if (userId.id == id) {
        let deleteUser = await userSchema.destroy({
            where: {
                id: id
            }
        })
        res.json({ Message: "Deleted user successfully", deleteUser, userDetails: { userId } })
    } else {
        res.json({ message: `This id : ${id} is not exist , Try another one` })
    }

}

export const updateUser = async (req, res) => {
    const { id, name, email, age, password } = req.body;
    let userData = await checkEmailIsExist(email);
    let userId = await checkIdIsExist(id);
    console.log(userId);
    if (userData.id == userId.id) {
        let updatUser = await userSchema.update({
            name,
            email,
            age,
            password
        },
            {
                where: {
                    id: userData.id
                }
            })
        console.log(updatUser);
        res.json({ message: "updateUser user successfully", userData, updatUser });
    } else {
        res.json({ message: "Can not update user data" });
    }

}

export const getUserStartWithACharAndAgeLessThan30 = async (req, res) => {
    let getAllUser = await userSchema.findAll({
        where: {
            age: {
                [Op.lt]: 30
            },
            name: {
                [Op.startsWith]: 'a'
            }
        }
    })

    res.json({ message: "sucess", getAllUser })
}

export const getAllUserBetweenThisIds = async (req, res) => {
    const { startId , endId } = req.body;
    if (startId > 0 && endId > 0) {
        if (startId <= endId ) {
            let allGetAllUserBetweenIds = await userSchema.findAll({
                where: {
                    id: {
                        [Op.between]: [startId, endId]
                    }
                }
            }
            )
            res.json({ message: "sucess", allGetAllUserBetweenIds })
        } else if (startId > endId) {
            let allGetAllUserBetweenIds = await userSchema.findAll({
                where: {
                    id: {
                        [Op.between]: [endId, startId]
                    }
                }
            }
            )
            res.json({ message: "sucess", allGetAllUserBetweenIds })
        }
    } else {
        res.json({ message: "the id number must be a postive number more than zero" })
    }

}

export const getAllUsers = async ( req , res ) => {
    let getAllUsers = await userSchema.findAll()
    res.json({message : "All users" , getAllUsers})
}


