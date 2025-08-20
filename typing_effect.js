const words = [
  "App Landing",
  "Software",
  "Startup",
  "Digital Agency",
  "Business",
  "Data Science",
];

let wordIndex = 0;
let charIndex = 0;
let currentWord = "";
let isDeleting = false;

const typingElement = document.getElementsByClassName(
  "banner_content_highlight"
)[0];
const typingSpeed = 50; // tốc độ gõ
const deletingSpeed = 50; // tốc độ xóa
const delayBetweenWords = 1500; // thời gian dừng giữa các từ

function type() {
  currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenWords);
      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

type();
