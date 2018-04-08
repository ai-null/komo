async function background () {
    let video = await document.getElementById('video-player')
    let title = await document.getElementById('title')
    let vidControl = await document.getElementById('video-control')

    let mouseenter = (e) => {
        e.addEventListener('mouseenter', () => {
            title.style.top = '0'
            vidControl.style.bottom = '0'
        })
    }

    let mouseleave = (e) => {
        e.addEventListener('mouseleave', () => {
            title.style.top = '-5rem'
            vidControl.style.bottom = '-5rem'
        })
    }

    mouseenter(video)
    mouseleave(title)
    mouseleave(vidControl)
    
    video.addEventListener('mouseleave', () => {
        if (video.src === null || !video.src) {
            title.style.top = '0'
            vidControl.style.bottom = '0'
        } else {
            title.style.top = '-5rem'
            vidControl.style.bottom = '-5rem'
        }

        mouseenter(vidControl)
        mouseenter(title)
    })
}

background()