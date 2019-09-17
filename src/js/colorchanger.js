'use strict';

//Changes color on div

//Variables
var jsExample = document.getElementById('js_example');
//Event listeners
jsExample.addEventListener("mouseover", changeColor, false);
jsExample.addEventListener("mouseout", changeColorBack, false);
//Functions
function changeColor() {
  jsExample.style.backgroundColor = '#025159';
}
function changeColorBack() {
  jsExample.style.backgroundColor = '#A67B9A';
}
