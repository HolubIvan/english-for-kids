export {addStarWin, addStarWrong};

//function to add star-win to rating
const addStarWin = () => {
    const rating = document.querySelector('.rating');
    let img = document.createElement('img');
    img.classList.add('star');
    img.setAttribute('src', './assets/img/star-win.svg');
    img.setAttribute('alt', 'star');
    rating.prepend(img);
    const audio = new Audio('./assets/audio/correct.mp3');
    audio.play()
}

//function to add star-error ro rating
const addStarWrong = () => {
    const rating = document.querySelector('.rating');
    let img = document.createElement('img');
    img.classList.add('star');
    img.setAttribute('src', './assets/img/star.svg');
    img.setAttribute('alt', 'star');
    rating.prepend(img);
    const audio = new Audio('./assets/audio/error.mp3');
    audio.play()
}
