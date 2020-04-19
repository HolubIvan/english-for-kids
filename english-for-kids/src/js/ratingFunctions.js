export {addStarWin, addStarWrong, finalResultFunction};

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


const finalResultFunction = ()=>{
    const layout = document.querySelector('.main');
    layout.innerHTML = '';
    const node = document.createElement('div');
    node.classList.add('final-section');
    const img = document.createElement('img');
    img.classList.add('success-img');
    img.setAttribute('src', './../assets/img/success.jpg')
    node.append(img);
    layout.append(node);
}