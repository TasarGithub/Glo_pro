const block = document.querySelector('.boxing');

console.dir(block);

const height = block.scrollHeight;
const width = block.scrollWidth;

document.querySelector('.box_button').addEventListener('click',()=>{
  block.style.height = `${block.scrollHeight}px`;
  block.style.width = `${block.scrollWidth}px`;
})