'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

var isDrag = false
var gStartPos
var gCurrEmoji

var gCurrImg
var gEmojies = ['🤬', '🤪', '😪', '🤮', '🤠', '🤹', '💩', '🤫', '👽', '🖐', '⏲', '👿'];

function onInit() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    document.querySelector('.meme').classList.add('hide')
    renderImg()
    renderFeachure()

    addMouseListeners()
}


function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}



function onMove(ev) {
    // console.log('Im from onDown')
    // console.log('before check');
    if (!isDrag) return 

    const pos = getEvPos(ev)//המיקום שעליו אני דורכת הרגע 

    // var idx = isClickedOnEmojiReturnIdx(pos)//הוא בודק האם אני בטווח של אימוגי ואם כן הוא מחזיר לי מיקום במערך שזה האוימוגי שלו
    // console.log(isClickedOnEmojiReturnIdx(pos));
    // if (!isClickedOnEmojiReturnIdx(pos)) return //הוא בודק האם אני בטווח של אימוגי ואם כן הוא מחזיר לי מיקום במערך שזה האוימוגי שלו
    // console.log(pos.x, pos.y);

    //איך אני אדע על איזה אימוגי אני דורכת אם
    //updateFeachure(idx, pos) //פה הוא מעדכן את האימוגי הזה במערך שהמיקום שלו השתנה

    // gStartPos = pos
    var idx = findEmojiInGmeme(gCurrEmoji)
    updateFeachure(idx, pos)

    renderMeme()
    renderText()
    renderFeachureOnCanvas()

}

function onDown(ev) {
    // console.log('Im from onMove')

    const pos = getEvPos(ev) //זה שומר לי את הלחיצה העכשווית על הקנבס
    console.log(isClickedOnEmojiReturnIdx(pos));

    var emoji = isClickedOnEmojiReturnIdx(pos)
    if (emoji === undefined) return 
    gCurrEmoji = emoji

    isDrag = true
    gStartPos = pos

}

function onUp() {
    console.log('Im from onUp')
    isDrag = false
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

function renderCanvas() {
    renderMeme()
    renderText()
    renderFeachure()
}

function renderFeachure() {
    var strHtml = gEmojies.map(emoji => `
        <div class="emoji-feachure" onclick="onAddFeachure('${emoji}')">${emoji}</div>
    `)
    document.querySelector('.feachure').innerHTML = strHtml.join('')
}

function onAddFeachure(emoji) {
    addFeachure(emoji);
}


//מרנדרת את האימוגים שלחצתי כבר על הקנבס
function renderFeachureOnCanvas() {
    gMeme.feachures.forEach(feachure => drawText(feachure.txt, feachure.pos.x, feachure.pos.y))
}


function onClickMeme(url) {
    console.log(url);
    var elMemeGalary = document.querySelector('.mems-gallery')
    elMemeGalary.classList.add('hide')

    gCurrImg = getImmgByUrl(url)

    createMeme(gCurrImg.id)
    console.log(gMeme);

    document.querySelector('.meme').classList.remove('hide')

    renderMeme()
}


function renderText() {
    var text = gMeme.lines[gMeme.selectedLineIdx].txt
    drawText(text, 0, 35)
}




function changeText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    console.log(gMeme.lines[gMeme.selectedLineIdx].txt);
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
    borderText(10)
}



function onDeleatText() {
    console.log('onRenderText');
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
    renderMeme()
    renderFeachureOnCanvas()

    document.querySelector('.text-box').value = ''
}

