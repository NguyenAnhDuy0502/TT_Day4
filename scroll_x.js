function getContentWidth(className) {
  //Lấy content width của section3_col2
  const section = document.querySelector(`.${className}`);
  const style = getComputedStyle(section);
  const paddingLeft = parseFloat(style.paddingLeft);
  const paddingRight = parseFloat(style.paddingRight);

  return section.clientWidth - paddingLeft - paddingRight;
}
//---------------------------------------------------------------------------------------------------------------
const contentWidthContainer = getContentWidth("section3_col2");

//Gán kích thước width và padding right cho feature_box
const paddingRightItem = 0.02 * contentWidthContainer;

let widthFeatureBox = (contentWidthContainer - (3 - 1) * paddingRightItem) / 3;
const widthViewPort = window.innerWidth;

if (768 < widthViewPort && widthViewPort <= 1024)
  widthFeatureBox = (contentWidthContainer - (2 - 1) * paddingRightItem) / 2;
else if (widthViewPort <= 768) widthFeatureBox = contentWidthContainer;

// Feature box width = clientWidth - padding trái/phải
document.querySelectorAll(".feature_box").forEach((featureBox) => {
  featureBox.style.width = widthFeatureBox + "px";
  featureBox.style.paddingRight = paddingRightItem + "0px";
});

//---------------------------------------------------------------------------------------------------------------
let isDown = false;
let startX;
let scrollLeft;
let isFirst = true;
let contentWidthInline = getContentWidth("section3_col2__inline");

enableDragToScroll("section3_col2_padding", "feature_box");
enableAutoScroll("section3_col2_padding");

function enableAutoScroll(list) {
  const container = document.querySelector(`.${list}`);

  //Sau 1 khoảng thời gian cố định tự scroll
  setInterval(() => {
    // Cuộn thêm 1/4 đoạn
    container.scrollTo({
      left: container.scrollLeft + contentWidthInline / 4,
      behavior: "smooth",
    });

    // Nếu gần tới mốc reset thì đưa về giữa đoạn thứ 2
    if (Math.abs(container.scrollLeft - 2 * contentWidthInline) < 1) {
      container.scrollLeft = contentWidthInline;
    }
  }, 6000);
}

function enableDragToScroll(list, item) {
  const container = document.querySelector(`.${list}`);

  //Để khi vừa load trang nằm ngay phần tử đầu tiên chứ không phải khoảng trắng
  container.scrollTo({
    left: contentWidthInline,
  });

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;

    //Thêm 2 sự kiện này bên trong mousedown do nếu để bên ngoài document.add... chỉ có thể dùng cho 1 phần tử do enableDragToScroll chỉ chạy 1 lần còn mỗi lần mousedown sẽ sinh lại document.add...
    //Do khi thêm sự kiện không thể truyền đối số container vào handleMouseMove trực tiếp nên cần tạo boundHandleMouseMove mới remove sự kiện được
    const boundHandleMouseMove = function (e) {
      handleMouseMove(e, container);
    };
    document.addEventListener("mousemove", boundHandleMouseMove);

    document.addEventListener(
      "mouseup",
      () => {
        //Sự kiện mousemove là sự kiện diễn ra liên tục không thể dùng { once: true } mà chỉ có thể xóa khi đang mouseup
        document.removeEventListener("mousemove", boundHandleMouseMove);
        if (isDown) snapToNearest(container, item);
        isDown = false;
      },
      { once: true }
    );
  });
}

function handleMouseMove(e, container) {
  if (!isDown) return;
  //Ngăn hành vi mặc định của trình duyệt như bôi đen chữ khi kéo để giữ trải nghiệm cuộn mượt mà.
  e.preventDefault();
  const walk = e.pageX - startX - container.offsetLeft;
  // container.scrollLeft là vị trí tọa độ nội bộ trong thanh cuộn, khi chưa cuộn giá trị sẽ là 0
  // scrollLeft = container.offsetLeft + "vị trí cuộn phần tử"
  // scrollLeft - walk = "vị trí cuộn phần tử" + e.pageX - startX (khoảng cách chuột di chuyển)

  container.scrollLeft =
    contentWidthInline +
    ((((scrollLeft - walk) % contentWidthInline) + contentWidthInline) %
      contentWidthInline);
}

//---------------------------------------------------------------------------------------------------------------
function snapToNearest(container, item) {
  const children = container.querySelectorAll(`.${item}`);
  let closestDistance = Infinity;

  children.forEach((child) => {
    //Đây là khoảng cách từ phần tử con đến cha có position: relative | absolute | fixed hoặc phần tử ngoài cùng, khi có dùng thanh cuộn vẫn sẽ tính như không có và chiều dài này cố định cho dù có cuộn
    const childLeft = child.offsetLeft;
    const distance = childLeft - (container.scrollLeft + container.offsetLeft);
    if (Math.abs(distance) < Math.abs(closestDistance)) {
      closestDistance = distance;
    }
  });

  container.scrollBy({
    left: closestDistance,
    behavior: "smooth",
  });
}
