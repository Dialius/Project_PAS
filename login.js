let failedAttempts = 0; // Menyimpan jumlah percobaan gagal

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Data pengguna yang valid
    const validUsers = [
        { username: 'admin1', password: 'admin1234'},
        { username: 'user1', password: 'user1234' },
        { username: 'user2', password: 'user1234' },
        { username: 'user3', password: 'user1234' }
    ];

    // Cek validitas username dan password
    let isValidUser  = false;
    for (let i = 0; i < validUsers.length; i++) {
        if (validUsers[i].username === username && validUsers[i].password === password) {
            isValidUser  = true;
            break;
        }
    }

    // Tampilkan pesan sesuai dengan hasil validasi
    const messageElement = document.getElementById('message');
    if (isValidUser ) {
        messageElement.style.color = 'green';
        messageElement.textContent = 'Login berhasil!';

        // Redireksi ke halaman home
        window.location.href = 'home.html'; 
    } else {
        failedAttempts++;
        messageElement.style.color = 'red';
        messageElement.textContent = 'Username atau password salah.';

        // Cek jika sudah 3 kali percobaan gagal
        if (failedAttempts >= 3) {
            // Redirect ke halaman reset password
            window.location.href = 'reset_password.html'; 
        }
    }
});