const express = require('express');
const users = require('../controllers/auth-controller');
const router = express.Router();

router.post('/api/register', users.create);
router.post('/api/login', users.login);

module.exports = router;
