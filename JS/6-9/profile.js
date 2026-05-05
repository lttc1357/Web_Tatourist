document.addEventListener('DOMContentLoaded', () => {
  const bookingSection = document.querySelector(".profile-booking-section");
  const infoSection = document.querySelector(".profile-info-section");
  const menuButtons = document.querySelectorAll(".menu-button");

  bookingSection.style.display = "none";

  // Kiểm tra localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const userData = JSON.parse(localStorage.getItem('currentUser'));

if (!isLoggedIn || !userData) {
    console.error('Bạn chưa đăng nhập');
    window.location.href = '/HTML/6-9/REGISTER.html';
    return;
}
  console.log('LocalStorage data:', userData);

  if (!userData) {
      console.error('Không tìm thấy dữ liệu người dùng');
      window.location.href = '/HTML/6-9/REGISTER.html';
      return;
  }

  // Hiển thị thông tin cá nhân
  document.getElementById('user-name').textContent = userData.name?.toUpperCase() || '';
  document.getElementById('profile-name').textContent = userData.name || '';
  document.getElementById('profile-email').textContent = userData.email || '';
  document.getElementById('profile-phone').textContent = userData.phone || '';
  document.getElementById('profile-gender').textContent = userData.gender === 'male' ? 'Nam' : 'Nữ';

  // Sự kiện chuyển tab
  menuButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
          menuButtons.forEach(btn => btn.classList.remove("active"));
          this.classList.add("active");

          if (index === 0) {
              infoSection.style.display = "block";
              bookingSection.style.display = "none";
          } else {
              infoSection.style.display = "none";
              bookingSection.style.display = "block";

              if (userData.booking) {
                document.getElementById("booking-info").style.display = "block";
                document.getElementById("no-booking-message").style.display = "none";
                document.getElementById("booking-artist").textContent = userData.booking.artist || '';
                document.getElementById("booking-date").textContent = userData.booking.date || '';
                document.getElementById("booking-time").textContent = userData.booking.time || '';
                document.getElementById("booking-style").textContent = userData.booking.style || '';
                document.getElementById("booking-method").textContent = userData.booking.paymentMethod || '';
            } else {
                document.getElementById("booking-info").style.display = "none";
                document.getElementById("no-booking-message").style.display = "block";
            }
            
          }
      });
  });
});
function logout() {
    localStorage.clear(); // Xóa toàn bộ localStorage
    window.location.href = '/HTML/6-9/REGISTER.html'; // Chuyển về trang đăng nhập
  }
  function logout() {
  if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
    localStorage.clear();
    window.location.href = '/HTML/6-9/REGISTER.html';
  }
}