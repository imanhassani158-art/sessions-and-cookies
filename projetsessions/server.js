const  express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const users = [];

app.use(
    session({
        secret: '1&BéC#chdCD',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
        },
    })
);


app.post('/register', async (req, res) => {
    const {username, password } = req.body;
    if(username || !password) 
        return res.status(400).send('Missing fields');
    const exists = users.find(u => u.username === username)
    if(exists) 
        return res.status(409).send('user already exists');
    const hashed = await bcrypt.hash(password, 10);
    users.push({username, password: hashed});

    res.status(201).send('User registred successfully')
})


app.post('/login', async (req, res) => {
    const {username, password } = req.body;
    const user = users.find(u => u.username === username)
    if (!user) 
        return res.status(401).send('Invalide credentials');

    req.session.user = {username};
    return res.send('Login successful');
});

const checkAuth = (req, res, next) => {
    if(req.session.user)
        return next();
    return res.status(402).send('not authanticate');
};

app.get('/profile', checkAuth, (req, res) => {
    res.send(`Hello ${req.session.user.username}!`)
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) 
            return res.status(500).send('Error logging out');
        res.clearCookie('connect.sid');
        res.json({message: 'Loggout successfuly'});
    });
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
})