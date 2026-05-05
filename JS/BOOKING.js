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