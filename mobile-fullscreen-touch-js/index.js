; (function () {
    const scrollPage = document.querySelector('.scroll-page')
    const scrollWrap = scrollPage.querySelector('.scroll-wrap')
    const sliders = scrollWrap.querySelectorAll('.slider-item')
    const progress = scrollPage.querySelector('.progress')

    let startX = 0, moveX = 0, distanceX = 0, pageIdx = 0, isMove = false
    const pageWidth = scrollPage.offsetWidth

    function init() {
        progress.setAttribute('stroke-dashoffset','-117')
        bindEvent()
    }

    function bindEvent() {
        document.addEventListener('touchstart', handleTouchStart, false)
        document.addEventListener('touchmove', handleTouchMove, false)
        document.addEventListener('touchend', handleTouchEnd, false)
    }

    function handleTouchStart(event) {
        const e = event || window.event
        startX = e.touches[0].clientX
    }

    function handleTouchMove(event) {
        const e = event || window.event
        moveX = e.touches[0].clientX
        if ((moveX > startX && pageIdx === 0) || (moveX < startX && pageIdx === sliders.length - 1)) {
            return
        }
        distanceX = moveX - startX
        setTransform(-pageIdx * pageWidth + distanceX,pageIdx)
        isMove = true
    }

    function handleTouchEnd() {
        if (isMove) {
            if (Math.abs(distanceX) < pageWidth / 3) {
                setTransform(-pageIdx * pageWidth)
                return
            }
            if (distanceX < 0) {
                pageIdx++
            }
            if (distanceX > 0) {
                pageIdx--
            }
            setTransform(-pageIdx * pageWidth,pageIdx)
        }
        startX = 0
        distanceX = 0
        isMove = false
    }

    function setTransform(transX,pageIdx) {
        const progressPoint = ['-117','-77','-37','0']
        scrollWrap.style.transition = 'all 0.2s'
        scrollWrap.style.transform = `translateX(${transX}px)`
        progress.setAttribute('stroke-dashoffset',progressPoint[pageIdx])
    }

    init()
})()
