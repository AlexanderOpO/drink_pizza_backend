const express = require('express');
const router = express.Router();
const crypto = require('crypto-xor');
const { password_secret_key: SECRET_KEY } = require('../configs/database')
const User = require('../models/user')

/* GET users listing. */
router.post(`/register`, async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        console.log(req);
        console.log(name);
        const encryptedPassword = crypto.encode(password, SECRET_KEY)
        const user = await User.create({
            name,
            email,
            password: encryptedPassword,
        })
        res.status(200).send({
            name: user.name,
            email: user.email,
        })
    } catch (error) {
        console.log(error);
        res.status(403).send()
    }
});

router.post(`/login`, async (req, res, next) => {
    try {
        const { email, password } = req.body
        const encryptedPassword = crypto.encode(password, SECRET_KEY)
        const user = await User.findOne({
            email,
            password: encryptedPassword
        })
        res.status(!!user ? 200 : 403).send({
            name: user.name,
            email: user.email,
        })
    } catch (error) {
        console.log(error);
        res.status(403).send()
    }
});


module.exports = router;
