const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');


module.exports = function(db){
    const router = express.Router();
    const crypto = require('crypto');

    router.post('/daftar', async (req, res) =>{
        const {usernameDaftar, passwordDaftar, emailDaftar} = req.body;
        const salt = crypto.randomBytes(16).toString('hex');
        const passDgnSalt = (passwordDaftar + salt).crypto.createHash('sha256').digest('hex');

        if(!usernameDaftar || !passwordDaftar || !emailDaftar){
            return res.status(400).json({ err : 'userame, Password And Email are required' });
        }

        try{
            const query = (`INSERT INTO booking_app.users (name, email, password, salt) VALUES ($1, $2, $3, $4) RETURNING id`);
            const result = await db.query(query, [usernameDaftar, emailDaftar, passDgnSalt, salt]);

            res.status(201).json({
                message: console.log(`Berhasil Mendaftar dengan name:  ${usernameDaftar} dan Password: ${passDgnSalt}, Menggunakan Email: ${emailDaftar}`),
                terdaftar: {
                    id: result.rows[0].id,
                    username: usernameDaftar,
                    password: passDgnSalt,
                    email: emailDaftar
                }
            });
        }catch(err){
            console.error('Gagal Mendaftar', err);
            return res.status(500).json({error: err.message});
        }
    });

    router.post('/login', async (req,res) =>{
        const {username, password, email} = req.body;
        if(!username)return res.status(400).json({err: 'Gagal Mengambil Data dari Frontend'});

        try{
            const query = `SELECT * FROM booking_app.users WHERE name VALUES $1`;
            const result = await db.query(query[username]);

            if(!result.rows[0]){
                return res.status(400).json({err: err.message});
            }else{
                const passwordDb = password;
                const saltnya = result.rows[0].salt;
                passSalted = crypto.createHash('sha256').update(passwordDb + saltnya).digest('hex');

                if(result.rows[0].password === passSalted && result.rows[0].email === email){
                    res.status(200).json({
                        user: {
                            id: result.rows[0].id,
                            username,
                            email
                        }
                    });
                }
            }
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    });





    return router
}