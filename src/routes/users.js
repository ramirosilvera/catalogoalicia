const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');


router.get('/users/signin', (req, res) => {
    res.render('users/signin')
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/catalogo',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({ text: 'Por favor, Ingresa tu nombre.' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden.' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe contener al menos 4 caracteres.' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, confirm_password });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error', 'El email no esta disponible.');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Has sido registrado exitosamente.');
            res.redirect('/users/signin');
        }
    }

});

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/catalogo');
});

module.exports = router;