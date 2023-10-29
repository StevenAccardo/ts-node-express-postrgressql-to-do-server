import User from './user.js';
import Task from './task.js';

User.hasMany(Task);
Task.belongsTo(User);

export { User, Task };
