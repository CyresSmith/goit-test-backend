const express = require('express');
const router = express.Router();

const { usersController } = require('../controller');

router.get('/', usersController.getAll);

router.post('/', usersController.getUsers);

router.patch('/:_id/follow', usersController.follow);

router.patch('/:_id/unfollow', usersController.unfollow);

module.exports = router;
