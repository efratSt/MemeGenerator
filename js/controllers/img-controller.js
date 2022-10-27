'use strict'

function renderImg() {
    var strHtml = gImgs.map(img => `
         <img src="${img.url}" onclick=" onClickMeme(this.src)"class="meme-img">
     `)
    document.querySelector('.mems-gallery').innerHTML = strHtml.join('')
}


//משום מה זה מאתחל לי כל פעם מחדש את המערך של השמורים
//פה זה אמור לרנדר לי את התמונות לדף של השמורים
function renderSaveImag() {
    var strHtml = ``
    console.log(gSaveMeme);
    gSaveMeme.forEach(saveMeme => {
        console.log('im in foreach');
        var img = getImgById(saveMeme.selectedLineIdx)
        strHtml += `<img src="${img.url}" onclick=" onClickMeme(this.src)"class="meme-img"></img>`
    });
    console.log('this str ' , strHtml);
    document.querySelector('.save-memes').innerHTML = strHtml
}