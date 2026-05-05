// Placeholder if interactivity is needed in the future
console.log("Page loaded");
function switchImage(mainId, src) {
    const img = document.getElementById(mainId);
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = src;
      img.style.opacity = 1;
    }, 250);
  }

  function startAutoSwitch(mainId, imgList) {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % imgList.length;
      switchImage(mainId, imgList[index]);
    }, 3000); // mỗi 3 giây
  }

  // Tự động chuyển ảnh sau khi trang tải
  window.onload = function () {
    startAutoSwitch("news-main", [
      "/IMAGES/BLOG/news1.png",
      "/IMAGES/BLOG/news2.png",
      "/IMAGES/BLOG/news3.png"
    ]);

    startAutoSwitch("event-main", [
      "/IMAGES/BLOG/event1.png",
      "/IMAGES/BLOG/event2.png",
      "/IMAGES/BLOG/event3.png"
    ]);
  };

  function toggleAnswer(element) {
    const answer = element.querySelector('.qa-answer');
    const isVisible = answer.style.display === 'block';
    document.querySelectorAll('.qa-answer').forEach(el => el.style.display = 'none');
    if (!isVisible) answer.style.display = 'block';
  }


