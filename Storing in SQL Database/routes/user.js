const express = require('express');
const userController = require('../controller/user');
const router = express.Router();

router.post('/add-user', userController.addUser);

router.get('/get-users', userController.getUser);

router.delete('/delete-user/:id', userController.deleteUser);

router.get('/edit-user/:id', userController.editUser);

module.exports = router;