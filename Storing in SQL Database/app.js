const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user');

app.use(cors());
app.use(bodyParser.json({extended: false}));

app.use('/user', userRoutes);


sequelize.sync()
.then(result => {
    app.listen(4000);
})
.catch(err => {
    console.log(err);
});
