'use strict'

function renderImg() {
    console.log('im in render');
    var strHtml = gImgs.map(img => `
         <img src="${img.url}" onclick=" onClickMeme(this.src)"class="meme-img">
     `)
    document.querySelector('.mems-gallery').innerHTML = strHtml.join('')
}