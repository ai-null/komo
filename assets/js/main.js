// use this file for styling or animation
// I use this file because i can't use async and await inside webpack

async function background () {
    let v = await document.getElementById('video-player')
    let title = await document.getElementById('title')
    let vidControl = await document.getElementById('video-control')
    let btn = await document.getElementsByClassName('btn')
    let mouseenter = (e) => {
        e.addEventListener('mouseenter', () => {
            title.style.top = '0'
            vidControl.style.bottom = '0'
        })
    }
    let mouseleave = (e) => {
        e.addEventListener('mouseleave', () => {
            if (v.src === null || !v.src) return
            else {
                title.style.top = '-7rem'
                vidControl.style.bottom = '-5rem'
            }
        })
    }

    for (let i of btn) {
        let g = i.className
        i.setAttribute('title', g.split(' ')[1])
    }

    mouseenter(v)
    mouseleave(title)
    mouseleave(vidControl)
    
    v.addEventListener('mouseleave', () => {
        if (v.src === null || !v.src) return
        else {
            title.style.top = '-7rem'
            vidControl.style.bottom = '-5rem'
        }

        mouseenter(vidControl)
        mouseenter(title)
    })
}

background()