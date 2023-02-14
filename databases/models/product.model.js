import { DataTypes } from 'sequelize';
import { sequelizeConnection } from './../dbConnection.js';
import { userSchema } from './user.model.js';


export const productSchema = sequelizeConnection.define('Product' , {
    id: {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pName  : {
        type : DataTypes.STRING(100)
    },
    pDescription:{
        type: DataTypes.STRING(200)
    },
    price : {
        type : DataTypes.DECIMAL
    }
} )

// await productSchema.drop()

// productSchema.associate = (models) => {
//     productSchema.belongsTo(models.userSchema, {
//       foreignKey: 'creatorId'
//     })
//   }

// await productSchema.drop(); // to drop the table
// productSchema.sync()
