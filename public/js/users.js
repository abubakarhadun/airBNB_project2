export function HalamanUsersAwal(username, email){
    const HalamanAwalLogin = document.getElementById('HalamanAwalLogin');
    HalamanAwalLogin.style.display = 'none';
    const HalamanAwalUsers = document.getElementById('HalamanAwalUsers');
    HalamanAwalUsers.style.display = 'flex';
    const WelcomeUsers = document.getElementById('WelcomeUsers');
    WelcomeUsers.innerHTML = `Selamat Datang ${username}`;

}