import { Sequelize } from 'sequelize';

// Create the ORM
const sequelize = new Sequelize(process.env.DB_URI ?? '');

// Check connection to database
export const syncDB = async function (): Promise<void> {
    try {
        // Test connection to DB
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // if (process.env.NODE_ENV !== 'production') {
        //     await sequelize.sync({ alter: true });
        // }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default sequelize;
