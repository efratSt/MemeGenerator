'use strict'

//זה אובייקט שהוא יהיה המימ שאליו עכשיו אני מכוונת
var gMeme = {}
//כאן אני אעשה פונקציה שתחזיר לי את תהמונה-כתובת תמונה


function createMeme(imgIdx) {
    var meme = {
        selectedImgId: imgIdx,
        selectedLineIdx: 0,
        feachures: [],
        lines: [{ txt: '', size: '40', width: 30, height: 50, color: 'white', stroke: 'black', }]
    }
    gMeme = meme
}


function resizeCanvas() {


    const elContainer = document.querySelector('.canvas-contaainer')


    // var width = elContainer.offsetWidth
    // var height = elContainer.offsetHeight

    // if (width <= 500 && height <= 500) {
        gElCanvas.width = elContainer.offsetWidth
        gElCanvas.height = elContainer.offsetWidth
        renderMeme()
    // }


}


//פונקציה שמקבלת קישור של תמונה ומציירת אותה על הקנבס
function drawMeme(url) {
    // console.log(url);
    // אני צריכה לעשות מערך של תמונות שבכל מערך יהיה הכתובת של התמונה
    const img = new Image()
    img.src = url
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}




//פונקציה שמציירת כיתוב שמקבלת במיקום שמקבלת על הקנבס
function drawText(text = '', x = 30, y = 50, size = 40) {
    //כאן אני אקרא לפונקציה שתצייר לי מסגרת לטקסט מתחילת העמוד ועד סוף העמוד בגוגבה נתון
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = gMeme.color
    gCtx.font = size + 'px Arial'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

// כאן אני אכתוב פונקציה שתצייר לי מסגרת לטקסט ברוחב של הקנבס ובוגבה מסוים
function borderText(height) {
    gCtx.lineWidth = 2
    gCtx.moveTo(10, height)
    gCtx.lineTo(490, height)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()

    gCtx.lineWidth = 2
    gCtx.moveTo(10, height)
    gCtx.lineTo(10, 60)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()

    gCtx.lineWidth = 2
    gCtx.moveTo(10, 60)
    gCtx.lineTo(490, 60)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()

    gCtx.lineWidth = 2
    gCtx.moveTo(490, 60)
    gCtx.lineTo(490, height)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}


//מוסיף אימוגי למערך של האימוגי במימ הגלובלי ומוסיף אותו לדף בנקודה קבועה
function addFeachure(emoji) {
    gMeme.feachures.push({ txt: emoji, pos: { x: 240, y: 240 }, size: 70 });
    renderFeachureOnCanvas()
}

//עכשיו אני רוצה לבדוק פה האם הלחיצה היא במיקום של אחד מהאימוגים
//והיא מחזירה לי את המיקום במערך של האימוגי שלחצתי עליו
function isClickedOnEmojiReturnIdx(pos) {
    var emoji = gMeme.feachures.find(feachure => {
        return pos.x >= feachure.pos.x + 20 && pos.x <= feachure.pos.x + feachure.size &&
            pos.y >= feachure.pos.y + 20 - feachure.size / 2 && pos.y <= feachure.pos.y + feachure.size / 2 - 20
    })

    //פה בעצם יש לי אימוגי וכאן אני יכולה לבדוק באיזה מיקום הוא במערך

    //לדעתי כדאי שאני אשנה את זה שיחזיר רק כן או לא ואז אני אעשה
    //עוד פונקציה שתמצא לי איפה האימוגי נמצא
    if (emoji) return emoji
    else return false
}


//זאת פונקציה שמוצאת לי אינדקס של אימוגי מסוים במערך של המימ הגלובלי
function findEmojiInGmeme(emoji) {
    var idxEmoji = gMeme.feachures.findIndex(feachure =>
        feachure.txt === emoji.txt && feachure.pos.x === emoji.pos.x && feachure.pos.y === emoji.pos.y
    )
    return idxEmoji
}

//הפונקציה מעדכנת לי בהינתן אינדקס ומיקום את המיקום על הקנבס
function updateFeachure(idx, pos) {
    if (!pos) return
    gMeme.feachures[idx].pos.x = pos.x
    gMeme.feachures[idx].pos.y = pos.y
}

