const dot = document.querySelector(".cursor_dot");
const outline = document.querySelector(".cursor_outline");

let targetDotX = 0,
  targetDotY = 0;
let dotX = 0,
  dotY = 0;
let outlineX = 0,
  outlineY = 0;

document.addEventListener("mousemove", (e) => {
  targetDotX = e.clientX;
  targetDotY = e.clientY;
});

document.addEventListener("mousedown", () => {
  dot.classList.add("click");
});

document.addEventListener("mouseup", () => {
  dot.classList.remove("click");
});

function custom_cursor() {
  // Dot di chuyển chậm hơn (hiệu ứng trễ)
  dotX += (targetDotX - dotX) * 0.5;
  dotY += (targetDotY - dotY) * 0.5;

  dot.style.top = dotY + "px";
  dot.style.left = dotX + "px";

  outlineX += (dotX - outlineX) * 0.1;
  outlineY += (dotY - outlineY) * 0.1;

  outline.style.top = outlineY + "px";
  outline.style.left = outlineX + "px";

  requestAnimationFrame(custom_cursor);
}

custom_cursor();
