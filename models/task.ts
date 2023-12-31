import { Model, INTEGER, STRING, DATE, BOOLEAN } from 'sequelize';
import type {
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey,
} from 'sequelize';
import sequelize from '../util/database.js';
import type User from './user.js';

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare task: string;
    declare completed: CreationOptional<boolean>;
    declare completed_timestamp: CreationOptional<Date | null>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Task.init(
    {
        id: {
            type: INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        task: {
            type: STRING,
            allowNull: false,
        },
        completed: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        completed_timestamp: {
            type: DATE,
            allowNull: true,
        },
        createdAt: DATE,
        updatedAt: DATE,
    },
    {
        tableName: 'tasks',
        sequelize,
    },
);

// // Defines what properties are required to be defined on the model
// interface TaskAttributes {
//     id: number;
//     userId: number;
//     task: string;
//     completed: boolean;
//     completed_timestamp?: Date;
// }

// // Makes the id optional upon creation, since it is auto-generated by sequelize.
// interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

// // Defines the properties on an instance, or record in the table.
// interface TaskInstance
//     extends Model<TaskAttributes, TaskCreationAttributes>,
//         TaskAttributes {
//     createdAt: Date;
//     updatedAt: Date;
// }

// export const Task = sequelize.define<TaskInstance>('task', {
//     id: {
//         type: INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     userId: {
//         type: INTEGER,
//         references: {
//             model: User,
//             key: 'id',
//         },
//     },
//     task: {
//         type: STRING,
//         allowNull: false,
//     },
//     completed: {
//         type: BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//     },
//     completed_timestamp: {
//         type: DATE,
//         allowNull: true,
//     },
// });

export default Task;
