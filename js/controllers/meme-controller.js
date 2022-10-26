'use strict'

let gElCanvas
let gCtx



function renderMeme(url) {
    //אני צריכה לרנדר לקבל את הקישור לתמונה דרך המימ הגלובאלי

    // var url = gMeme.url

    //כאן צריכים לרנדר תמונה על המסך ולהוסיף לה שורת טקסט

    drawMeme(gCurrImg.url)//מציירת תמונה שנתון הקישור שלה על המסך
    // drawText(text, 0, 0)//מוסיף טקסט במיקום ההתחלתי למעלה
   //מוסיף מסגרת לשורת טקסט
    // borderText()//מוסיף מסגרת לשורת טקסט
}


























//פןנקציה שמקבלת קישור של תמונה ומפעילה מהסרוויס פונקציה שתצייר את התמונה על הקנבס
function onDrawImg(url) {
    console.log(url);
    renderMeme(url)
}

