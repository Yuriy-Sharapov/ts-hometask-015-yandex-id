const express = require('express')
const router = express.Router()
const { passport, isAuthenticated } = require('./auth')

router.get('/', (req, res) => {
    res.render('index', { user: req.user })
})

// отображаем в виде json информацию о пользователе
router.get('/profile', 
    isAuthenticated,
    (req, res) => {
        res.json({ user: req.user })
    }
)

router.get('/login', 
    passport.authenticate('yandex')
)

router.get('/logout',  (req, res) => {
    //passport.logout()
    req.logout(() => {
      res.redirect('/')
    })
})

router.get('/auth/yandex/callback', 
    passport.authenticate('yandex', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/')
    }
)

module.exports.router = router