'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

var isDrag = false
var gStartPos
var gCurrEmoji
var gCurrLine = 0


var gSaveMeme

var gCurrImg
var gEmojies = ['๐คฌ', '๐คช', '๐ช', '๐คฎ', '๐ค ', '๐คน', '๐ฉ', '๐คซ', '๐ฝ', '๐', 'โฒ', '๐ฟ'];

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





//ืืงืฉืื ืืืืจืืขื ืขืืืจ
function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}


//ืืืฉืจ ืืืืจ ืืืืฅ ืขื ืืงื ืืก
function onMove(ev) {
    if (!isDrag) return

    const pos = getEvPos(ev)//ืืืืงืื ืฉืขืืื ืื ื ืืืจืืช ืืจืืข 

    var idx = findEmojiInGmeme(gCurrEmoji)
    updateFeachure(idx, pos)

    renderMeme()
    renderText()
    renderFeachureOnCanvas()

}

//ืืืฉืจ ืืขืืืจ ื ืืฆื ืืขื ืืงื ืืก
function onDown(ev) {

    const pos = getEvPos(ev) //ืื ืฉืืืจ ืื ืืช ืืืืืฆื ืืขืืฉืืืืช ืขื ืืงื ืืก

    var emoji = isClickedOnEmojiReturnIdx(pos)
    if (emoji === undefined) return
    gCurrEmoji = emoji

    isDrag = true
    gStartPos = pos

}
//ืืืฉืจ ืืขืืืจ ืขืืื ืืช ืืชืืื ื
function onUp() {
    isDrag = false
}

//ืืจื ืืจืช ืืช ืืืืืืืื ืืืกื ืขืฆืื
function renderFeachure() {
    var strHtml = gEmojies.map(emoji => `
        <div class="emoji-feachure" onclick="onAddFeachure('${emoji}')">${emoji}</div>
    `)
    document.querySelector('.feachure').innerHTML = strHtml.join('')
}

//ืืจื ืืจ ืืช ืืชืืื ื ืืชืื ืืงื ืืก
function renderMeme() {
    if (!gCurrImg.url) return
    drawMeme(gCurrImg.url)
}


//ืืจื ืืจืช ืืช ืืืืืืืื ืฉืืืฆืชื ืืืจ ืขื ืืงื ืืก
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



//ืืืฉืจ ืืืืฆืื ืขื ืชืืื ื ืืกืืื
function onClickMeme(url) {
    var elMemeGalary = document.querySelector('.mems-gallery')
    elMemeGalary.classList.add('hide')

    gCurrImg = getImmgByUrl(url)

    createMeme(gCurrImg.id)

    document.querySelector('.meme').classList.remove('hide')
    gCurrLine = 0

    renderMeme()
    borderText(10)
    renderText()
}

//ืจืื ืืืจ ืืงืกื ืืงื ืืก
function renderText() {
    
    gMeme.lines.forEach(line => {
        var text = line.txt
        var color = line.color
        drawText(text, line.width, line.height, line.size, color)
    })


    // var text = gMeme.lines[gMeme.selectedLineIdx].txt
    // var size = gMeme.lines[0].size
    // drawText(text, gMeme.lines[0].width, gMeme.lines[0].height, gMeme.lines[0].size)
}


//ืืืฉืจ ืงืืจื ืฉืื ืื ืืืงืกื
function changeText(text) {
    gMeme.lines[gCurrLine].txt = text
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
    borderText(10)
}


//ืืืฉืจ ืืืืฆืื ืืืคืชืืจ ืืืืงื
function onDeleatText() {
    if (!gMeme) return

    gMeme.lines[gCurrLine].txt = ''
    if (gCurrLine === 1) gMeme.lines.splice(gCurrLine, 1)
    // ืคื ืฆืจืื ืืืืืง ืืืืขืจื ืืช ืืฉืืจื ืื ืืืืืช ืืื ืืช ืืฉืืจื ืฉืืขืืื ืื ืืืื ืฆืจืื
    if (gCurrLine === 1) gCurrLine = 0

    renderMeme()
    renderFeachureOnCanvas()
    renderText()

    // gMeme.lines[0].height = 50
    // gMeme.lines[0].width = 30

    document.querySelector('.text-box').value = ''
}


//ืืืื ืืช ืืืงืกื ืืฉืืื, ืืื ืืื ืืืืคืืื
function onElingLeft() {
    gMeme.lines[gCurrLine].width = 30
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}


//ืืืื ืืช ืืืงืกื ืืืืฆืข
function onElingCenter() {
    gMeme.lines[gCurrLine].width = 150
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}


//ืืืื ืืช ืืืงืกื ืืฆื ืืืื
function onElingRight() {
    gMeme.lines[gCurrLine].width = 350
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}

//ืืืฉืจ ืืฉื ืื ืืช ืืฆืืข
function onChangeColor(color) {
    gMeme.lines[gCurrLine].color = color
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}


//ืืืฉืจ ืืืืฆืื ืขื ืืฉืืจื ืฉื ืืืืกืคืช ืืกืงื ืื ืืืกืืฃ ืขืื ืฉืืจื ืืืขืจื ืฉื ืืฉืืจืืช
function OnAddLineText() {
    gMeme.lines.push({ txt: '', size: 40, width: 30, height: 400, color: 'white', stroke: 'black' })
    console.log(gMeme.lines);
}


//ืืืืืช ืืืงืกื ืืืืขืื
function onTextUp() {
    if (gMeme.lines[0].height <= 50) return
    gMeme.lines[gCurrLine].height -= 20
    console.log(gMeme.lines[0].height);
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}

//ืืืืืช ืืืงืกื ืืืื
function onTextDown() {
    if (gMeme.lines[0].height >= 470) return
    gMeme.lines[gCurrLine].height += 20
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}

//ืืืืืื ืืช ืืืืื ืฉื ืืคืื ื
function onBiggerFont() {
    var size = +gMeme.lines[0].size
    size += 10
    gMeme.lines[0].size = size
    renderMeme()
    renderText()
    renderFeachureOnCanvas()
}


//ืืงืืื ื ืืช ืืืืื ืฉื ืืคืื ื, ืื ืืืชืจ ืงืื ื-10
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




//ืืืจืืช ืืชืืื ื ืืืืฉื
function onDownLoad(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')// image/jpeg the default format
    elLink.href = imgContent
}


function onClickSave() {
    if (!gSaveMeme) gSaveMeme = []
    gSaveMeme.push(gMeme)
    console.log('from click saveMeme', gSaveMeme);
}


//ืืืฉืจ ืืืืฆืื ืขื ืืืกืคืช ืฉืืจื
function onEddLine() {
    if (gMeme.lines.length >= 2) return
    gMeme.lines.push({ txt: 'Your text here', size: '40', width: 30, height: 400, color: 'white', stroke: 'black', })
    gCurrLine = 1
    document.querySelector('.text-box').value = ''
    renderText()
}

function onChangeSelectLine() {
    console.log('befor change', gCurrLine);
    console.log('gMeme.lines.length', gMeme.lines.length);
    if (gCurrLine === 0 && gMeme.lines.length > 1) gCurrLine = 1
    else if (gCurrLine === 1) gCurrLine = 0
    console.log('after change', gCurrLine);

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