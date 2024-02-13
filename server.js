const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
app.set('view-engine', 'ejs')

const users = []

app.get('/', (req, res) => {
    res.render('index.ejs', {name: 'yaswanth'})
})

app.use(express.urlencoded({extended: false}))

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', async(req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        res.redirect('/login')
    }catch{
        res.redirect('/register')
    }
})

// app.post('/login', (req, res) => {
    
// })

// app.post('/register', (req, res) => {

// })

app.listen(3000)