
document.addEventListener('DOMContentLoaded', () => {
  const trashItems = [
    { src: 'assets/images/plastic_bottle.png', type: 'plastic' },
    { src: 'assets/images/newspaper.png', type: 'paper' },
    { src: 'assets/images/banana_peel.png', type: 'general' }
  ];

  const container = document.getElementById('trash-items');
  trashItems.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = item.src;
    img.setAttribute('data-type', item.type);
    img.setAttribute('draggable', true);
    img.id = 'item-' + index;
    img.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', e.target.id);
    });
    container.appendChild(img);
  });

  document.querySelectorAll('.bin').forEach(bin => {
    bin.addEventListener('dragover', e => e.preventDefault());
    bin.addEventListener('drop', e => {
      const id = e.dataTransfer.getData('text/plain');
      const dragged = document.getElementById(id);
      const type = dragged.getAttribute('data-type');
      if (type === bin.getAttribute('data-type')) {
        dragged.remove();
        document.getElementById('score').textContent = parseInt(document.getElementById('score').textContent) + 1;
        new Audio('assets/sounds/correct.wav').play();
      } else {
        new Audio('assets/sounds/wrong.wav').play();
      }
    });
  });
});
