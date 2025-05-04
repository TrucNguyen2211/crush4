"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 5;
let play = true;
let noCount = 0;

// 🔁 Danh sách ảnh GIF dùng khi bấm "No"
const gifLinks = [
  "https://media1.tenor.com/m/EykL-3Hc06kAAAAC/tonton-tobi.gif",
  "https://media1.tenor.com/m/pg4wTu1OdDUAAAAC/baro.gif",
  "https://media.tenor.com/x42WE_yLlfgAAAAi/uncry-cat.gif",
  "https://media1.tenor.com/m/n8Ql8FxaWTMAAAAd/kitten-love.gif",
  "https://media1.tenor.com/m/a_DFSqheS8kAAAAd/cute-cat.gif",
  "https://media1.tenor.com/m/woOB5lft_fgAAAAC/miamihurricanes-love.gif"
];

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    catImg.src = gifLinks[Math.min(noCount - 1, gifLinks.length - 1)];
    resizeYesButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  // Thay đổi tiêu đề + ảnh + ẩn nút
  titleElement.innerHTML = "Thươnngưng cậu vậy mình call nhaaaa, click nút ở dưới nhaha";
  catImg.src = "https://media1.tenor.com/m/woOB5lft_fgAAAAC/miamihurricanes-love.gif";
  buttonsContainer.classList.add("hidden");

  // Gửi message đến webhook Discord
  sendDiscordWebhookMessage("✨ Alo alo, cậu ấy bấm YES rồi đó, chuẩn bị call điiii 📞💗");
  window.open("https://discord.com/channels/@me", "_blank");
}

function sendDiscordWebhookMessage(message) {
  fetch("https://discord.com/api/webhooks/1368444480675512390/3A6LvKH-sekqpIWAsZtJEkUDIRUmU277L-uHzZi1qduCcJkCiiFTXRh-Ch1m7AtTw-Ry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: message
    })
  })
  .then(response => {
    if (response.ok) {
      console.log("🎉 Đã gửi thành công đến Discord!");
    } else {
      console.error("❌ Lỗi khi gửi webhook:", response.statusText);
      alert("Không gửi được message lên Discord rồi 😢");
    }
  })
  .catch(err => {
    console.error("❌ Lỗi khi fetch webhook:", err);
    alert("Gặp sự cố khi gửi đến Discord");
  });
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  yesButton.style.fontSize = `${fontSize * 1.6}px`;
}

function generateMessage(noCount) {
  const messages = [
    "Không Bao Giờ",
    "Tớ bicc lỗi rồi ạa",
    "Hix sorry cậu ạ, tha lỗi choo tớ nha :((",
    "Tớ saii rồi , Tớ đáng trách ạ",
    "Thui mà call với tớ nha",
    "Tớ iu cậu lắm lun đóoooo",
  ];
  return messages[Math.min(noCount, messages.length - 1)];
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}
