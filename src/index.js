const express = require('express')
const dotenv = require('dotenv').config(); // подключаем работу с переменными среды окружения
const { passport, cookieParser, expressSession } = require('./auth')
const { router } = require('./routes')

const app = express()
app.use(express.json())   
app.use(express.urlencoded())
app.set("views","src/views")
app.set('view engine', 'ejs')
app.use(expressSession) // важно, чтобы expressSession был раньше passport.session()
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening a PORT ${PORT}...`)
})