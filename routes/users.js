const express = require('express');
const crypto = require('crypto');

module.exports = function (db) {
    const router = express.Router();

    // REGISTER
    router.post('/daftar', async (req, res) => {
        const { usernameDaftar, passwordDaftar, emailDaftar } = req.body;

        if (!usernameDaftar || !passwordDaftar || !emailDaftar) {
            return res.status(400).json({ error: 'Data tidak lengkap' });
        }

        try {
            const salt = crypto.randomBytes(16).toString('hex');
            const hashedPass = crypto.createHash('sha256').update(passwordDaftar + salt).digest('hex');

            const query = `
                INSERT INTO booking_app.users (name, email, password, salt)
                VALUES ($1, $2, $3, $4)
                RETURNING id, name, email
            `;

            const result = await db.query(query, [
                usernameDaftar,
                emailDaftar,
                hashedPass,
                salt
            ]);

            console.log(`Berhasil Mendaftar: ${usernameDaftar} (${emailDaftar})`);

            return res.status(201).json({
                terdaftar: result.rows[0]
            });
        } catch (err) {
            console.error('Gagal Mendaftar:', err);
            return res.status(500).json({ error: err.message });
        }
    });

    // LOGIN
    router.post('/login', async (req, res) => {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Data tidak lengkap.' });
        }

        try {
            // Fix query yang sebelumnya rusak total
            const query = `SELECT * FROM booking_app.users WHERE name = $1`;
            const result = await db.query(query, [username]);

            if (result.rows.length === 0) {
                return res.status(400).json({ error: 'User tidak ditemukan' });
            }

            const user = result.rows[0];
            const hashed = crypto.createHash('sha256').update(password + user.salt).digest('hex');

            if (hashed !== user.password || email !== user.email) {
                return res.status(401).json({ error: 'Password atau email salah' });
            }

            return res.status(200).json({
                user: {
                    id: user.id,
                    username: user.name,
                    email: user.email
                }
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    });

    return router;
};
