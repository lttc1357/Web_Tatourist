document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('name');
    const mailInput = document.getElementById('mail');
    const phoneInput = document.getElementById('phone');
    const signupBtn = document.getElementById('signupBtn');
    const signinBtn = document.getElementById('signinBtn');
    const authForm = document.getElementById('auth-form');
  
    let registeredUser = null;
    let isRegistering = true;
  
    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        togglePassword.classList.toggle('fa-eye-slash');
    });
  
    // Toggle between register and login forms
    signinBtn.addEventListener('click', () => {
        isRegistering = !isRegistering;
        
        if (isRegistering) {
            // Switch to register mode
            authForm.classList.remove('login-mode');
            nameInput.style.display = 'block';
            signupBtn.textContent = 'Sign up';
            signinBtn.textContent = 'Sign in';
        } else {
            // Switch to login mode
            authForm.classList.add('login-mode');
            nameInput.style.display = 'none';
            signupBtn.textContent = 'Login';
            signinBtn.textContent = 'Back';
        }
    });
  
    // Handle signup/login
    signupBtn.addEventListener('click', () => {
        const termsChecked = document.getElementById('terms').checked;
        
        if (!termsChecked) {
            alert('You must agree to the Terms and Privacy Policy');
            return;
        }

        const email = mailInput.value.trim();
        const pass = passwordInput.value.trim();
  
        if (isRegistering) {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value;

    if (!name || !email || !pass || !phone) {
        alert('Please fill in all fields.');
        return;
    }

    const newUser = { name, email, pass, phone, gender };

    // Lưu vào localStorage
    localStorage.setItem('registeredUser', JSON.stringify(newUser));

    alert('Registered successfully! Please login.');

    // Chuyển sang chế độ login
    isRegistering = false;
    authForm.classList.add('login-mode');
    nameInput.style.display = 'none';
    signupBtn.textContent = 'Login';
    signinBtn.textContent = 'Back';
}
         else {
            // Login logic
            if (!localStorage.getItem('registeredUser')) {
    alert('Please register first.');
    return;
}

const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

// Kiểm tra nếu đã có currentUser cũ (để giữ booking)
const oldCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
if (oldCurrentUser && oldCurrentUser.booking) {
    storedUser.booking = oldCurrentUser.booking; // giữ lại thông tin booking
}

localStorage.setItem('currentUser', JSON.stringify(storedUser));
localStorage.setItem('isLoggedIn', 'true');


if (email === storedUser.email && pass === storedUser.pass) {
    localStorage.setItem('currentUser', JSON.stringify(storedUser));
    localStorage.setItem('isLoggedIn', 'true'); // Thêm flag đăng nhập
    window.location.href = '/HTML/6-9/profile.html';
} else {
    alert('Incorrect email or password.');
}
        }
    });
});

