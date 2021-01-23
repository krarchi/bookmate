const express = require('express');
const router = express.Router();
const controller = require('../controller/user_controller')


router.get('/logout', controller.logout);

router.post('/create', controller.create);

router.post('/login', controller.login)

router.post('/update', controller.update )

router.get('/getall', controller.get_all)

module.exports = router
