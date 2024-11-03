const passport = require('passport')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const YandexStrategy = require('passport-yandex').Strategy

function isAuthenticated(req, res, next){
    if (req.isAuthenticated())
        return next()
    else
        res.redirect('/')
}

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/yandex/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() =>{
            return done(null, profile)
        })
    }
))

module.exports.passport = passport
module.exports.cookieParser = cookieParser
module.exports.expressSession = expressSession({ secret: process.env.COOKIE_SECRET || "COOKIE_SECRET" })
module.exports.isAuthenticated = isAuthenticated