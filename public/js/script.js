import { HalamanUsersAwal } from './users.js';

const HalamanDaftar = document.getElementById('HalamanDaftar');
const HalamanAwalLogin = document.getElementById('HalamanAwalLogin');

// LOGIN
HalamanAwalLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('UsernameLogin').value;
    const password = document.getElementById('PasswordLogin').value;
    const email = document.getElementById('EmailLogin').value;

    if (username && password && email) {
        fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    alert(`Anda Berhasil Login ${data.user.username}`);
                    HalamanUsersAwal(data.user.username, data.user.email);
                } else {
                    alert('Username atau Password Salah');
                }
            })
            .catch(err => {
                console.log(err.message);
                alert('Terjadi masalah saat login');
            });
    } else {
        alert('Isi Semua Data !!!');
    }
});

// REGISTER
HalamanDaftar.addEventListener('submit', function (e) {
    e.preventDefault();

    const usernameDaftar = document.getElementById('UsernameDaftar').value;
    const passwordDaftar = document.getElementById('PasswordDaftar').value;
    const emailDaftar = document.getElementById('EmailDaftar').value;

    if (usernameDaftar && passwordDaftar && emailDaftar) {
        fetch('/users/daftar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernameDaftar, passwordDaftar, emailDaftar })
        })
            .then(res => res.json())
            .then(data => {
                if (data.terdaftar) {
                    alert(`Anda Berhasil Mendaftar Sebagai ${data.terdaftar.name}`);
                    HalamanAwalLogin.style.display = 'flex';
                    HalamanDaftar.style.display = 'none';
                } else {
                    alert('Gagal Menyimpan Data');
                }
            })
            .catch(err => {
                console.log(err.message);
                alert('Terjadi kesalahan saat mendaftar');
            });
    } else {
        alert('Isi Semua Data !!!');
    }
});

// ganti halaman
document.getElementById('Daftar').addEventListener('click', function (e) {
    e.preventDefault();
    HalamanAwalLogin.style.display = 'none';
    HalamanDaftar.style.display = 'flex';
});

document.getElementById('kembaliDaftar').addEventListener('click', function (e) {
    e.preventDefault();
    HalamanAwalLogin.style.display = 'flex';
    HalamanDaftar.style.display = 'none';
});
