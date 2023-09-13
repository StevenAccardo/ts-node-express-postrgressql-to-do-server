import { Sequelize } from 'sequelize';

// Create the ORM
export default new Sequelize(process.env.DB_URI ?? '');
