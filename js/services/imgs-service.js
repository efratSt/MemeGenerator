'use strict'

var gImgs = [
    { id: 1, url: `img/1.jpg`, keywords: []},
    { id: 2, url: `img/2.jpg`, keywords: []},
    { id: 3, url: `img/3.jpg`, keywords: [] },
    { id: 4, url: `img/4.jpg`, keywords: [] },
    { id: 5, url: `img/5.jpg`, keywords: [] },
    { id: 6, url: `img/6.jpg`, keywords: [] },
    { id: 7, url: `img/7.jpg`, keywords: [] },
    { id: 8, url: `img/8.jpg`, keywords: [] },
    { id: 9, url: `img/9.jpg`, keywords: [] },
    { id: 10, url: `img/10.jpg`, keywords: [] },
    { id: 11, url: `img/11.jpg`, keywords: [] },
    { id: 12, url: `img/12.jpg`, keywords: [] },
    { id: 13, url: `img/13.jpg`, keywords: [] },
    { id: 14, url: `img/14.jpg`, keywords: []},
    { id: 15, url: `img/15.jpg`, keywords: [] },
    { id: 16, url: `img/16.jpg`, keywords: [] },
    { id: 17, url: `img/17.jpg`, keywords: [] },
    { id: 18, url: `img/18.jpg`, keywords: [] },
]


function getImgs() {
    return gImgs
}


//פה זה מחזיר לי אובייקט של תמונה מהמערך של התמונות שעליו לחצו
function getImmgByUrl(url) {
    var meme = gImgs.find(img => {
        return url.includes(img.url) 
    })
    return meme
}

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}

