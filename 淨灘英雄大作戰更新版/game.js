
const items = [
  { name: "寶特瓶", type: "plastic", img: "assets/images/bottle.png" },
  { name: "塑膠袋", type: "plastic", img: "assets/images/bag.png" },
  { name: "塑膠吸管", type: "plastic", img: "assets/images/straw.png" },
  { name: "塑膠包裝", type: "plastic", img: "assets/images/wrapper.png" },
  { name: "報紙", type: "paper", img: "assets/images/newspaper.png" },
  { name: "紙杯", type: "paper", img: "assets/images/cup.png" },
  { name: "紙盒", type: "paper", img: "assets/images/box.png" },
  { name: "紙巾", type: "paper", img: "assets/images/tissue.png" },
  { name: "香蕉皮", type: "general", img: "assets/images/banana.png" },
  { name: "咖啡渣", type: "general", img: "assets/images/coffee.png" }
];

let score = 0;
const trashContainer = document.getElementById("trash-items");
const scoreDisplay = document.getElementById("score");

function createTrashItem() {
  const item = items[Math.floor(Math.random() * items.length)];
  const img = document.createElement("img");
  img.src = item.img;
  img.className = "trash";
  img.draggable = true;
  img.dataset.type = item.type;

  img.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", item.type);
  });

  trashContainer.innerHTML = '';
  trashContainer.appendChild(img);
}

document.querySelectorAll(".bin").forEach(bin => {
  bin.addEventListener("dragover", e => e.preventDefault());
  bin.addEventListener("drop", e => {
    const type = e.dataTransfer.getData("text/plain");
    if (type === bin.dataset.type) {
      score += 10;
      new Audio("assets/sounds/correct.mp3").play();
    } else {
      score -= 5;
      new Audio("assets/sounds/wrong.mp3").play();
    }
    scoreDisplay.textContent = "分數：" + score;
    createTrashItem();
  });
});

createTrashItem();
