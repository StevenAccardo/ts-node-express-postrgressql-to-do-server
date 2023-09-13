import { INTEGER, STRING } from 'sequelize';
import type { Optional, Model } from 'sequelize';

import sequelize from '../util/database';

interface UserAttributes {
    id: number;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export const User = sequelize.define<UserInstance>('user', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: STRING,
        allowNull: false,
    },
    password: {
        type: STRING,
        allowNull: false,
    },
});
