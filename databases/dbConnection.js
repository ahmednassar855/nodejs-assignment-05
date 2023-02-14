import { Sequelize } from "sequelize";


export const sequelizeConnection = new Sequelize('assignment-05', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


export const createDb = () => {
    sequelizeConnection.sync( {
        alter : true,
    } )
}