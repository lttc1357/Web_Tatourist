function showTab(tabName) {
    // Ẩn tất cả các bước
document.getElementById('step-artist').classList.add('hidden');
document.getElementById('step-style').classList.add('hidden');
document.getElementById('step-payment').classList.add('hidden');

    // Hiện bước tương ứng
document.getElementById('step-' + tabName).classList.remove('hidden');

    // Xoá class 'tab-active' khỏi tất cả các nút
document.querySelectorAll('.tab-buttons button').forEach(button => {
    button.classList.remove('tab-active');
});

    // Thêm class 'tab-active' vào nút đang chọn
document.getElementById('tab-' + tabName).classList.add('tab-active');
}
document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    
    if (userData) {
      const nameInput = document.getElementById('name');
      const phoneInput = document.getElementById('phone');
      const emailInput = document.getElementById('email');

      if (nameInput) nameInput.value = userData.name || '';
      if (phoneInput) phoneInput.value = userData.phone || '';
      if (emailInput) emailInput.value = userData.email || '';
    } else {
      console.warn('Chưa có người dùng đăng nhập.');
    }
  });
  