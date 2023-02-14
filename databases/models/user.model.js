import { DataTypes } from 'sequelize';
import { sequelizeConnection } from './../dbConnection.js';
import { productSchema } from './product.model.js';

export const userSchema = sequelizeConnection.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER  
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }

})
// await userSchema.drop();


userSchema.hasMany(productSchema , {
    foreignKey : 'createdBy',
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
});


// userSchema.sync()
// await userSchema.drop(); // to drop the table
