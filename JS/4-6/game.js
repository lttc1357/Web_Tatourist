let player;

//  Hàm được YouTube API gọi khi đã sẵn sàng
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: 'Fvnk6FDa7xg',
    playerVars: {
      autoplay: 1,             //  Tự động phát video
      controls: 0,             //  Ẩn thanh điều khiển
      showinfo: 0,             //  Ẩn thông tin video ban đầu
      modestbranding: 1,       //  Giảm logo YouTube
      loop: 1,                 //  Lặp lại video
      playlist: 'Fvnk6FDa7xg', //  Phải khai báo lại ID nếu muốn loop hoạt động
      mute: 1,                 //  Tắt tiếng mặc định
      rel: 0,                  //  Không hiển thị video liên quan
      fs: 0,                   //  Tắt chế độ toàn màn hình
      playsinline: 1           //  Cho phép phát trong khung (iOS)
    },
    events: {
      onReady: function (e) {
        e.target.setPlaybackQuality('hd1080'); //  Chọn chất lượng cao nếu có
        e.target.playVideo();                  //  Bắt đầu phát
      }
    }
  });
}

//  Sự kiện khi bấm nút “Chơi game”
document.querySelector('.glow-button').addEventListener('click', () => {
  document.querySelector('.voucher-box').style.display = 'none';     //  Ẩn hộp voucher
  document.getElementById('game-rules-popup').style.display = 'flex'; //  Hiện hướng dẫn
});

//  Khi bấm “Bắt đầu”
document.getElementById('start-game-btn').addEventListener('click', () => {
  document.getElementById('game-rules-popup').style.display = 'none';
  document.querySelector('.voucher-box').style.display = 'none';
  document.getElementById('game-container').classList.remove('game-hidden'); //  Hiện canvas game
  startGame(); //  Khởi động game
});

function startGame() {
  const canvas = document.getElementById('snake-canvas');
  const ctx = canvas.getContext('2d');

  const box = 20;                  //  Kích thước mỗi ô
  const canvasSize = 700;          //  Kích thước tổng canvas (700x700)
  let snake = [{ x: 5 * box, y: 5 * box }]; //  Snake bắt đầu ở tọa độ (100,100)
  let direction = "RIGHT";
  let score = 0;
  let gameTime = 40;               // Thời gian chơi: 40s
  let timer = document.getElementById("timer");
  let interval, countdown;
  let collectedVouchers = [];     //  Danh sách phần thưởng nhận được

  const items = [
    { label: "Voucher giảm 10%", color: "gold", chance: 0.8 },
    { label: "Combo giảm 30%", color: "lime", chance: 0.025 },
    { label: "Free tư vấn", color: "cyan", chance: 0.05 },
    { label: "Chúc bạn may mắn lần sau", color: "gray", chance: 0.8 }
  ];

  // Tạo ngẫu nhiên một phần thưởng
  function spawnItem() {
    const availableItems = items.filter(item => {
      if (item.label.includes("Chúc")) return true; //  Luôn cho phép "Chúc bạn may mắn"
      return !collectedVouchers.includes(item.label); //  Không lặp lại voucher đã nhận
    });

    const rand = Math.random();
    let total = 0;
    for (let item of availableItems) {
      total += item.chance;
      if (rand <= total) {
        return {
          ...item,
          x: Math.floor(Math.random() * (canvasSize / box)) * box,
          y: Math.floor(Math.random() * (canvasSize / box)) * box,
        };
      }
    }

    //  Phòng trường hợp không item nào được chọn (rất hiếm)
    return {
      label: "Chúc bạn may mắn lần sau",
      color: "gray",
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
  }

  let food = spawnItem();

  //  Điều khiển rắn bằng phím mũi tên
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  });

  //  Vẽ trò chơi
  function draw() {
    ctx.fillStyle = "#111"; //  Nền canvas
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Vẽ rắn với hiệu ứng phát sáng
    for (let i = 0; i < snake.length; i++) {
      const s = snake[i];
      let gradient = ctx.createRadialGradient(s.x + box / 2, s.y + box / 2, 5, s.x + box / 2, s.y + box / 2, box);
      gradient.addColorStop(0, i === 0 ? "#fff" : "#0ff");
      gradient.addColorStop(1, i === 0 ? "#aaa" : "#003344");

      ctx.fillStyle = gradient;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#00ffff";
      ctx.fillRect(s.x, s.y, box, box);
    }
    ctx.shadowBlur = 0;

    //  Vẽ phần thưởng (food)
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, box, box);

    //  Tính toán vị trí mới cho đầu rắn
    let head = { ...snake[0] };
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;

    //  Kiểm tra game over (chạm tường hoặc chính mình)
    if (
      head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize ||
      snake.some((s, idx) => idx !== 0 && s.x === head.x && s.y === head.y)
    ) {
      clearInterval(interval);
      clearInterval(countdown);
      showResult(score, collectedVouchers, true); //  Gọi hàm hiển thị kết quả
      return;
    }

    snake.unshift(head);

    //  Nếu ăn trúng food
    if (head.x === food.x && head.y === food.y) {
      if (!food.label.includes("Chúc")) {
        score++;
        collectedVouchers.push(food.label); //  Ghi nhận voucher nhận được
      }
      food = spawnItem(); //  Sinh phần thưởng mới
    } else {
      snake.pop(); //  Nếu không ăn thì xóa đuôi (rắn không dài ra)
    }
  }

  interval = setInterval(() => {
    draw(); //  Cập nhật game mỗi 100ms
  }, 100);

  countdown = setInterval(() => {
    gameTime--;
    timer.textContent = "Thời gian: " + gameTime; //  Cập nhật đồng hồ
    if (gameTime === 0) {
      clearInterval(interval);
      clearInterval(countdown);
      showResult(score, collectedVouchers, false); //  Hết giờ
    }
  }, 1000);
}

//  Hiển thị kết quả khi kết thúc
function showResult(score, vouchers, isCrash) {
  localStorage.setItem("voucherReward", JSON.stringify(vouchers)); //  Lưu vào localStorage

  let result = vouchers.length
    ? "Bạn nhận được:\n- " + vouchers.join("\n- ")
    : "Bạn chưa nhận được voucher nào.";

  alert((isCrash ? "Game Over! " : "Hết giờ! ") + "Bạn đạt được " + score + " điểm.\n\n" + result);

  window.location.href = '/HTML/BOOKING.html'; //  Chuyển hướng sau game
}
