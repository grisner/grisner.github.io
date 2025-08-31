let items = document.querySelectorAll(".slider .item")
let active = 3;
function loadShow() {
  items[active].style.transform = `none`;
  items[active].style.zIndex = 1;
  items[active].style.filter = "none";
  items[active].style.opacity = 1;
  // show after
  let stt = 0;
  for (var i = active + 1; i < items.length; i++) {
    stt++;
    items[i].style.transform = `translateX(${120 * stt}px) scale(${
      1 - 0.2 * stt
    }) perspective(16px) rotateY(-1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = "blur(5px)";
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
  stt = 0;
  for (var i = active - 1; i >= 0; i--) {
    stt++;
    items[i].style.transform = `translateX(${-120 * stt}px) scale(${
      1 - 0.2 * stt
    }) perspective(16px) rotateY(1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = "blur(5px)";
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
}
loadShow();
let next = document.getElementById("next");
let prev = document.getElementById("prev");
next.onclick = function () {
  active = active + 1 < items.length ? active + 1 : 0;
  console.log({active})
  loadShow();
};
prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : items.length - 1;
  
  console.log({active})
  loadShow();
};

let startX;
let isDragging = false;
document.querySelector('.slider').addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});
document.querySelector('.slider').addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = startX - currentX;
  if (Math.abs(diff) > 50) {
    if (diff > 0 && active < items.length - 1) {
      active++;
    } else if (diff < 0 && active > 0) {
      active--;
    }
    loadShow();
    isDragging = false;
  }
});

// Auto-rotate every 3 seconds
const autoRotate = setInterval(() => {
  console.log('new image')
  active = (active + 1) % items.length;
  loadShow();
}, 3000);
// Stop auto-rotation when user interacts
document.querySelector('.slider').addEventListener('mouseenter', () => {
  clearInterval(autoRotate);
});
