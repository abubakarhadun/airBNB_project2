const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

//koneksi ke Postgresql
const pool = require('./db/postgres.js');


const userRouter = require('./routes/users.js')(pool);


//Routing
app.use('/users', userRouter);

//node URL dan port server.js
app.listen(port, () => {
    console.log(`SERVER BERJALAN DI http://localhost:${port}`);
});