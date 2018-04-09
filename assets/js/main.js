// use this file for styling or animation
// I use this file because i can't use async and await inside webpack

async function background () {
    let video = await document.getElementById('video-player')
    let title = await document.getElementById('title')
    let vidControl = await document.getElementById('video-control')
    let midButton = await document.getElementById('middleBtn')

    let mouseenter = (e) => {
        e.addEventListener('mouseenter', () => {
            title.style.top = '0'
            vidControl.style.bottom = '0'
        })
    }

    let mouseleave = (e) => {
        e.addEventListener('mouseleave', () => {
            if (video.src === null || !video.src) {
                return
            } else {
                title.style.top = '-7rem'
                vidControl.style.bottom = '-5rem'
            }
        })
    }

    mouseenter(video)
    mouseleave(title)
    mouseleave(vidControl)
    
    video.addEventListener('mouseleave', () => {
        if (video.src === null || !video.src) {
            return
        } else {
            title.style.top = '-7rem'
            vidControl.style.bottom = '-5rem'
        }

        mouseenter(vidControl)
        mouseenter(title)
    })
}

background()