const counters = document.querySelectorAll('.number'); //  Lấy tất cả phần tử có class 'number' để đếm số
let triggered = false; //  Đảm bảo hiệu ứng chỉ chạy một lần duy nhất

function runCounters() {
  if (triggered) return; //  Nếu đã chạy rồi thì không chạy lại

  const section = document.getElementById('our-work'); //  Khu vực chứa các số đang đếm
  const rect = section.getBoundingClientRect(); //  Lấy vị trí và kích thước khu vực đó so với viewport

  //  Kiểm tra xem phần tử đã hiện ra trong vùng nhìn thấy của người dùng chưa
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    triggered = true; //  Đánh dấu đã chạy

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target'); // Mục tiêu số cần đếm đến (lấy từ thuộc tính HTML)
      let current = 0;
      const increment = Math.max(1, target / 60); //  Số tăng mỗi frame (tối thiểu là 1)

      //  Hàm cập nhật giá trị hiện tại theo hiệu ứng tăng dần
      const update = () => {
        current += increment;
        if (current >= target) {
          counter.textContent = target; //  Gán giá trị cuối cùng
        } else {
          counter.textContent = Math.floor(current); //  Làm tròn để tránh số lẻ
          requestAnimationFrame(update); //  Gọi lại hàm update ở frame tiếp theo (mượt hơn setTimeout)
        }
      };

      update(); //  Bắt đầu hiệu ứng đếm
    });
  }
}

window.addEventListener('scroll', runCounters); //  Khi người dùng cuộn trang, kiểm tra để kích hoạt đếm
