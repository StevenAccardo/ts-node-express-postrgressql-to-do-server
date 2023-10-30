import User from './user.js';
import Task from './task.js';

User.hasMany(Task, { foreignKey: { name: 'userId', allowNull: false } });
Task.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

export { User, Task };
