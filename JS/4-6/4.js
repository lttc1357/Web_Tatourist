document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 1;
    let autoSlideInterval; 
    /* Đợi toàn bộ nội dung HTML được tải hoàn tất trước khi chạy JavaScript
→ Đảm bảo các phần tử DOM đã tồn tại khi script truy cập.*/

    function showSlides(n) {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");

        if (n > slides.length) slideIndex = 1; /*Lấy tất cả phần tử có class slide và dot.
                                                Nếu n vượt quá số slide, quay lại đầu (slideIndex = 1)
                                                Nếu n < 1, quay về slide cuối → tạo hiệu ứng lặp vô hạn (vòng tròn)*/
        if (n < 1) slideIndex = slides.length;

        for (let i = 0; i < slides.length; i++) {  /*Ẩn tất cả các slide trước khi hiển thị cái mới*/
            slides[i].style.display = "none";
        }

        for (let i = 0; i < dots.length; i++) { /*Loại bỏ class "active" khỏi tất cả dấu chấm*/
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block"; 
        dots[slideIndex - 1].className += " active"; /* Hiển thị slide hiện tại Gán class active cho dot tương ứng*/
    }

    function plusSlides(n) {
        clearInterval(autoSlideInterval);
        showSlides(slideIndex += n);
        autoSlide(); // restart auto slide
    }

    function currentSlide(n) {
        clearInterval(autoSlideInterval);
        showSlides(slideIndex = n);
        autoSlide(); // restart auto slide
    }

    // Tự động chuyển
    function autoSlide() {
        autoSlideInterval = setInterval(() => {
            plusSlides(1);
        }, 3000);
    }

    // Gắn sự kiện click
    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => {
        dot.addEventListener("click", function () {
            currentSlide(parseInt(this.getAttribute("data-index")));
        });
    });

    showSlides(slideIndex);
    autoSlide();
});
// Khi rê chuột vào từng .menu-item, thêm/bỏ class 'show' cho .caption
document.querySelectorAll('.menu-item').forEach(item => {
    const caption = item.querySelector('.caption');
    item.addEventListener('mouseenter', () => {
      caption.classList.add('show');
    });
    item.addEventListener('mouseleave', () => {
      caption.classList.remove('show');
    });
  });