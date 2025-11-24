import {HalamanUsersAwal} from './users.js'; 

const HalamanDaftar = document.getElementById('HalamanDaftar');
const HalamanAwalLogin = document.getElementById('HalamanAwalLogin');



HalamanAwalLogin.addEventListener('submit', function(e){
    e.preventDefault();

    const username = document.getElementById('UsernameLogin').value;
    const password = document.getElementById('PasswordLogin').value;
    const email    = document.getElementById('EmailLogin').value;

    if(password && username && email){
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'    // FIXED
            },
            body: JSON.stringify({username, password, email})
        })
        .then(res => res.json())
        .then(data =>{
            if(data.user){
                console.log('Anda Berhasil Login');
                alert(`Anda Berhasil Login ${data.user.username}`);
                HalamanUsersAwal(data.user.username, data.user.email);
            }else{
                alert('Username Dan Password Salah');
            }
        })
        .catch(err => {
            console.log(err.message); // FIX TYPO massage -> message
            alert('Terjadi masalah Saat Login');
        });
    }else{
        console.log('Isi Semua Data !!!');
        alert('Isi Semua Data !!!');
    }
});


HalamanDaftar.addEventListener('submit', function(e){
    e.preventDefault();
    const usernameDaftar = document.getElementById('UsernameDaftar').value;
    const passwordDaftar = document.getElementById('PasswordDaftar').value;
    const emailDaftar = document.getElementById('EmailDaftar').value;
    if(usernameDaftar && passwordDaftar && emailDaftar){
        fetch('/users/daftar', {
            method: 'POST',
            headers: {'Content Type' : 'application/json'},
            body:JSON.stringify({usernameDaftar, passwordDaftar, emailDaftar})
        }).then(data => {
            if(data.terdaftar){
                console.log(`Anda Berhasil Mendaftar Sebagai ${data.terdaftar.username}, dan password: ${data.terdaftar.password}, menggunakan Email ${data.terdaftar.email}`);
                alert(`Anda Berhasil Mendaftar Sebagai ${usernameDaftar}`); 
                HalamanAwalLogin.style.display = 'flex';
                HalamanDaftar.style.display = 'none';    
            }else{
                alert('Gagal Menyimpan Data');
                console.log(err.error);
            }
        }).catch(err => {
            console.log('fetch err', err.message);
            alert('Terjadi Kesalahan saat Mendaftar');
        });
    }else{
        console.log('Isi Semua Data !!!');
        alert('Isi Semua Data !!!');
        return;
    }


});

document.getElementById('Daftar').addEventListener('click', function(e){
    e.preventDefault();
    HalamanAwalLogin.style.display = 'none';
    HalamanDaftar.style.display = 'flex';    
}); 


document.getElementById('kembaliDaftar').addEventListener('click', function(e){
    e.preventDefault();
    HalamanAwalLogin.style.display = 'flex';
    HalamanDaftar.style.display = 'none';
})