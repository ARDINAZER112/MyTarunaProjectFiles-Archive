// Memasukkan Client ID milik Anda (Client Secret tidak perlu dimasukkan ke frontend)
const GOOGLE_CLIENT_ID = "526269606912-7h62nhf39jcl95gujai44ktov85hf1no.apps.googleusercontent.com";

// --- FUNGSI GOOGLE OAUTH ---

// Fungsi untuk membongkar data (Token JWT) yang dikirim oleh Google
function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Fungsi yang berjalan jika pengguna berhasil login dengan akun Google-nya
function handleGoogleLogin(response) {
    // Membongkar token untuk mendapatkan data profil
    const responsePayload = decodeJwtResponse(response.credential);

    // Membuat objek pengguna untuk disimpan di browser
    const googleUser = {
        name: responsePayload.name,
        email: responsePayload.email,
        photo: responsePayload.picture
    };

    // Simpan ke localStorage agar bisa dibaca di halaman beranda
    localStorage.setItem('aktif_user', JSON.stringify(googleUser));
    
    alert("Berhasil masuk sebagai: " + responsePayload.name);
    // Arahkan ke beranda setelah sukses login
    window.location.href = "beranda.html";
}

// Inisialisasi Tombol Google saat halaman selesai dimuat
window.onload = function () {
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin
    });

    // Menampilkan tombol di dalam container di index.html
    google.accounts.id.renderButton(
        document.getElementById("google-btn-container"),
        { theme: "outline", size: "large", width: "350" } 
    );
};


// --- FUNGSI NAVIGASI FORM MANUAL ---

// Fungsi untuk berpindah antar tab (Login, Daftar, Lupa Password)
window.switchTab = function(tabName) {
    document.querySelectorAll('.auth-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${tabName}-section`).classList.add('active');
};

// --- SIMULASI LOGIN & DAFTAR MANUAL (OPSIONAL, TETAP DIPERTAHANKAN) ---

document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const userData = { name: name, email: email, password: password };
    localStorage.setItem('db_' + email, JSON.stringify(userData));

    alert('Pendaftaran berhasil! Silakan masuk.');
    switchTab('login'); 
});

document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    const storedUser = localStorage.getItem('db_' + email);

    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.password === password) {
            const activeUser = {
                name: parsedUser.name,
                email: parsedUser.email,
                photo: `https://ui-avatars.com/api/?name=${parsedUser.name.replace(' ', '+')}&background=4f46e5&color=fff`
            };

            if (rememberMe) {
                localStorage.setItem('aktif_user', JSON.stringify(activeUser));
            } else {
                sessionStorage.setItem('aktif_user', JSON.stringify(activeUser));
            }

            alert('Berhasil masuk!');
            window.location.href = "beranda.html";
            
        } else {
            alert('Password yang Anda masukkan salah!');
        }
    } else {
        alert('Email tidak terdaftar! Silakan daftar terlebih dahulu.');
    }
});

document.getElementById('forgot-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Simulasi: Tautan untuk mengatur ulang password telah dikirim ke email Anda.');
    switchTab('login');
});