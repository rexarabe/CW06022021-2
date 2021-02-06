class Slide{
    constructor(src, description){
        this._src = src;
        this._description = description;
    }
    get src(){
        return this._src;
    }

    get description(){
        return this._description;
    }

}

class Carousel{
    construction(slides, currentIndex=0){
        this._slides = slides;
        this._currentIndex = currentIndex;
    }
    get currentIndex(){
        return this._currentIndex;

    }
    set currentIndex(value){
        if(typeof value !== "number") throw new TypeError();
        if(!Number.isSafeInteger() || value<0 || value>=this._slides.length)
            throw new RangeError();
        this._currentIndex = value;
    }
    get currentSlide(){
        return this._slides[this._currentIndex];
    }
    get nextSlide() {
        return this._slides[this.nextIndex];
    }
    get prevSlide() {
        return this._slides[this.prevIndex];
    }
    get nextIndex() {
        return (this.nextIndex + 1)% this._slides.length;
    }
    get prevIndex() {
        return (this._currentIndex - 1 + this._slides.length) % this._slides.length;
    }

}

const carousel = new Carousel(
    [
        new Slide('https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg','Van gogh'),
        new Slide('https://ychef.files.bbci.co.uk/1600x900/p03lcphh.webp','scream Munch'),
        new Slide('',''),
        new Slide('',''),
        new Slide('',''),
    ]
);

const [prevButtonElem, nextButtonElem] = document.querySelectorAll('btn');

prevButtonElem.addEventListener("click", sliderClickPrev("prev"));
nextButtonElem.addEventListener('click', sliderClickNext("next"));

const sliderClick = (direction = 'next') => (e) => {
    carousel.currentIndex = carousel[direction == "next" ? "nextIndex" : "prevIndex"];
    const oldCurrentImg = document.querySelector('currentImage');
    const newCurrentImg = document.querySelector('nextImage');
    const currentSlide = carousel.currentSlide;
    const nextSlide = carousel[direction == 'next' ? 'nextIndex' : 'prevIndex'];
    newCurrentImg.classList.replace("nextImage", "currentImage");
    oldCurrentImg.classList.replace('currentImage', 'nextImage');
    newCurrentImg.setAttribute('src', currentSlide.src);
};

prevButtonElem.addEventListner('click', sliderClick('prev'));