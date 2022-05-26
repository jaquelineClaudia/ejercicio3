const { app } = require('./app');
const { User } = require('./models/user.model');
const { Repair } = require('./models/repair.model');
const { db } = require('./utils/database');

db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err));

User.hasMany(Order);
Order.belongsTo(User);

db.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Express app running on port ${PORT}`);
});
