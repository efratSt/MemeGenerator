'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

var isDrag = false
var gStartPos
var gCurrEmoji

var gSaveMeme

var gCurrImg
var gEmojies = ['🤬', '🤪', '😪', '🤮', '🤠', '🤹', '💩', '🤫', '👽', '🖐', '⏲', '👿'];

function onInit() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    document.querySelector('.meme').classList.add('hide')
    renderImg()
    renderFeachure()

    window.addEventListener('resize', () => {
        resizeCanvas()
    })

    addMouseListeners()
}


function initSave() {
    renderSaveImag()
}





//הקשבה לאירועי עכבר
function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}


//כאשר הכבר לוחץ על הקנבס
function onMove(ev) {
    if (!isDrag) return

    const pos = getEvPos(ev)//המיקום שעליו אני דורכת הרגע 

    var idx = findEmojiInGmeme(gCurrEmoji)
    updateFeachure(idx, pos)

    renderMeme()
    renderText()
    renderFeachureOnCanvas()

}

//כאשר העכבר נמצא מעל הקנבס
function onDown(ev) {

    const pos = getEvPos(ev) //זה שומר לי את הלחיצה העכשווית על הקנבס

    var emoji = isClickedOnEmojiReturnIdx(pos)
    if (emoji === undefined) return
    gCurrEmoji = emoji

    isDrag = true
    gStartPos = pos

}
//כאשר העכבר עוזב את התמונה
function onUp() {
    isDrag = false
}

//מרנדרת את האימוגים למסך עצמו
function renderFeachure() {
    var strHtml = gEmojies.map(emoji => `
        <div class="emoji-feachure" onclick="onAddFeachure('${emoji}')">${emoji}</div>
    `)
    document.querySelector('.feachure').innerHTML = strHtml.join('')
}

//מרנדר את התמונה לתוך הקנבס
function renderMeme() {
    if (!gCurrImg.url) return
    drawMeme(gCurrImg.url)
}


//מרנדרת את האימוגים שלחצתי כבר על הקנבס
function renderFeachureOnCanvas() {
    gMeme.feachures.forEach(feachure => drawText(feachure.txt, feachure.pos.x, feachure.pos.y))
}


function getEvPos(ev) {
    // console.log(ev);
    //Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}




function onAddFeachure(emoji) {
    addFeachure(emoji);
}



//כאשר לוחצים על תמונה מסוים
function onClickMeme(url) {
    var elMemeGalary = document.querySelector('.mems-gallery')
    elMemeGalary.classList.add('hide')

    gCurrImg = getImmgByUrl(url)

    createMeme(gCurrImg.id)

    document.querySelector('.meme').classList.remove('hide')

    renderMeme()
}

//רינדור טקסט לקנבס
function renderText() {
    var text = gMeme.lines[gMeme.selectedLineIdx].txt
    var size = gMeme.lines[0].size
    drawText(text, gMeme.lines[0].width, gMeme.lines[0].height, gMeme.lines[0].size)
}


//כאשר קורה שינוי בטקסט
function changeText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
    borderText(10)
}


//כאשר לוחצים הכפתור מחיקה
function onDeleatText() {
    if (!gMeme) return
    console.log('onRenderText');
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
    renderMeme()
    renderFeachureOnCanvas()

    gMeme.lines[0].height = 50
    gMeme.lines[0].width = 30

    document.querySelector('.text-box').value = ''
}


//מזיז את הטקסט לשמאל, ככה הוא בדיפולט
function onElingLeft() {
    gMeme.lines[0].width = 30
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}


//מזיז את הטקסט לאמצע
function onElingCenter() {
    gMeme.lines[0].width = 150
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}


//מזיז את הטקסט לצד ימין
function onElingRight() {
    gMeme.lines[0].width = 350
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}

//כאשר משנים את הצבע
function onChangeColor(color) {
    console.log(color);
    gMeme.color = color
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}


//כאשר לוחצים על השורה של ההוספת טסקט זה מוסיף עוד שורה במערך של השורות
function OnAddLineText() {
    gMeme.lines.push({ txt: '', size: 40, width: 30, height: 400, color: 'white', stroke: 'black' })
    console.log(gMeme.lines);
}


//הוזזת הטקסט ללמעלה
function onTextUp() {
    if (gMeme.lines[0].height <= 50) return
    gMeme.lines[0].height -= 20
    console.log(gMeme.lines[0].height);
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}

//הוזזת הטקסט למטה
function onTextDown() {
    if (gMeme.lines[0].height >= 470) return
    gMeme.lines[0].height += 20
    console.log(gMeme.lines[0].height);
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}

//מגדילה את הגודל של הפונט
function onBiggerFont() {
    var size = +gMeme.lines[0].size
    size += 10
    gMeme.lines[0].size = size
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}


//מקטינה את הגודל של הפונט, לא יותר קטן מ-10
function onSmollerFont() {
    var size = +gMeme.lines[0].size
    if (size <= 10) return

    size -= 10
    gMeme.lines[0].size = size
    console.log(gMeme.lines[0].size);
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}


function OnGoBackToGallery() {
    document.querySelector('.mems-gallery').classList.remove('hide')
    document.querySelector('.meme').classList.add('hide')
    gMeme = null
    onDeleatText()
}




//הורדת התמונה למחשב
function onDownLoad(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    elLink.href = imgContent
}


function onClickSave() {
    if (!gSaveMeme) gSaveMeme = []
    gSaveMeme.push(gMeme)
    console.log('from click saveMeme', gSaveMeme);
}

async function shareCanvas() {
    const canvasElement = gElCanvas;
    const dataUrl = canvasElement.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [
        new File(
            [blob],
            'animation.png',
            {
                type: blob.type,
                lastModified: new Date().getTime()
            }
        )
    ];
    const shareData = {
        files: filesArray,
    };
    navigator.share(shareData);
}