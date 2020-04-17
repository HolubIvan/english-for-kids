import {cards} from './js/cards';
import {Card} from './js/Card';
import {layout, navBar, switchBar} from './js/constants'


//Window listener
window.addEventListener('load', ()=>{

    if(cards){
        renderCategoriesToDom();
    }

    //set base state to Train mode
    localStorage.setItem('isPlay', false);
})


//render categories to DOM for the first time load page
const renderCategoriesToDom = () => {

    layout.innerHTML = '';

    createCategories(cards);
}


//Create cards function
const createCards = (key) => {
    cards[key].forEach((el)=>{
        layout.append(new Card(el).createCategory())
    }) 
}


//Create categories function
const createCategories = (object) => {
    for(let key in object){
        let node = document.createElement('a');
        node.setAttribute('href', `#${key}`);
        node.classList.add('card-main');
        let img = document.createElement('img');
        img.classList.add('card-main__img');
        img.setAttribute('src', `./assets/${object[key][0].image}`);
        let title = document.createElement('p');
        title.classList.add('card-main__title');
        title.textContent = key;
        node.append(img);
        node.append(title);
        layout.append(node);
    }
}



// layout handler for changing categories to cards
layout.addEventListener('click', (event)=>{

    //part for main page when we change categories to cards
    if(event.target.closest('.card-main')){

        //check if navbar is open(if open - close)
        if(document.querySelector("#hamburger-checkbox").checked == true){
            document.querySelector("#hamburger-checkbox").checked = false;
        }

        document.querySelector("#hamburger-checkbox").checked = false;
        for(let key in cards){
            if(event.target.closest('.card-main').getAttribute('href') === `#${key}`){
                layout.innerHTML = ''
                createCards(key); 
           }
        }
    }

    //part for cards when we push for arrwos to change side of card
    if(event.target.closest('.card')){
        
        //check if navbar is open(if open - close)
        if(document.querySelector("#hamburger-checkbox").checked == true){
            document.querySelector("#hamburger-checkbox").checked = false;
        }

       if(event.target.className === 'card__front__arrows'){
            event.target.parentNode.parentNode.firstChild.classList.add('rotateBack');
            event.target.parentNode.parentNode.lastChild.classList.add('rotateFront');

            event.target.parentNode.parentNode.addEventListener('mouseleave', ()=>{
                event.target.parentNode.parentNode.firstChild.classList.remove('rotateBack');
                event.target.parentNode.parentNode.lastChild.classList.remove('rotateFront');
            })
       }

       //part to add audio file to card
    if(event.target.closest('.card__front__title')){

        // ./../assets/audio/${event.target.textContent}.mp3
        // /Users/golubidze13/Desktop/holubivan-RS2020Q1/english-for-kids/assets/audio/${event.target.textContent}.mp3

        const audio = new Audio(`./../assets/audio/${event.target.textContent}.mp3`);
            setTimeout(()=>{
                audio.play()
        }, 700)
        // document.querySelector('.audio__file').setAttribute('src', `./assets/audio/${event.target.textContent}.mp3`);
        // document.querySelector('.audio').play();
       }
    }
})


//removed underline from navbar link function
const removeUnderlineFromNavbarLink = ()=>{
    document.querySelectorAll('.navbar__link').forEach((el)=>{
        if(el.classList.contains('underline')){
            el.classList.remove('underline')
        }
    })
}



//navbar handler for change category
navBar.addEventListener('click', (event)=>{
    for(let key in cards){
        if(event.target.getAttribute('href') === `#${key}`){
            layout.innerHTML = ''
            createCards(key); 
            document.querySelector("#hamburger-checkbox").checked = false;
            removeUnderlineFromNavbarLink();
            event.target.classList.add('underline');
       }
       if(event.target.getAttribute('href') === '#MainPage'){
            layout.innerHTML = '';
            createCategories(cards);
            removeUnderlineFromNavbarLink();
            event.target.classList.add('underline');
            document.querySelector("#hamburger-checkbox").checked = false;
       }
    }
})

function checkStateMode (){
    if(localStorage.getItem('isPlay') === 'false'){
        localStorage.setItem('isPlay', true);
        document.querySelector('.switch__header').textContent = 'Play';
        document.querySelector('.button-start').style.display = 'block'
    } else if (localStorage.getItem('isPlay') === 'true'){
        localStorage.setItem('isPlay', false);
        document.querySelector('.switch__header').textContent = 'Train';
        document.querySelector('.button-start').style.display = 'none'
    } 
}

//switchBar handler to switch between Train/Play mode
switchBar.addEventListener('click', ()=>{
    checkStateMode();
})
