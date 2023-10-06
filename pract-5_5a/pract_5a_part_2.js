const clickLeft = () => {
 const sliderItemNodes = document.getElementsByClassName('slider-item');

 let prevIndex = null;
 for (let i = 0; i < sliderItemNodes.length; i += 1) {
  if (sliderItemNodes[i].classList.contains('selected')) {
   prevIndex = i - 1;
   if (prevIndex == -1) {
    prevIndex = sliderItemNodes.length - 1;
   }
  }
 }

 // const selectedNodes = document.getElementsByClassName('selected');
 // /**
 //  * "class1 class2 class3".toggle('class3') => "class1 class2"
 //  * 
 //  * "class1 class2".toggle('class3') => "class1 class2 class3"
 //  */
 // selectedNodes[0].classList.toggle('selected');

 const [selectedNode] = document.getElementsByClassName('selected');
 selectedNode.classList.toggle('selected');

 sliderItemNodes[prevIndex].classList.toggle('selected');
};

/**
 * setInterval(() => {
 *  console.log('This was interval')
 * }, 2000)
 * 
 * текст 'This was interval' виведеться в консоль через кожні 2с(2000мс)
 * 
 */
setInterval(clickLeft, 1500);

document.getElementById('left')
 .addEventListener('click', clickLeft);