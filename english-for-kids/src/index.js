import {cards} from './js/cards';
import {Card} from './js/Card';

//variables
let layout = document.querySelector('.main');
let categoryCard = document.querySelector('.card-main');
let switcher = document.querySelector('.switch');


//Window listener
window.addEventListener('load', ()=>{

    if(cards){
        renderCategoriesToDom();
    }

    // localStorage.setItem('isPlay', false)
})


//switch button listener
// switcher.addEventListener('click', ()=>{
//     changeGameStatus();
    
// })



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


//Game status changer from train to play
// const changeGameStatus = ()=>{
//     if(localStorage.getItem('isPlay' === false)){
//         localStorage.setItem('isPlay', true)
//     } else {
//         localStorage.setItem('isPlay', false)
//     }
    
// }



// layout handler for changing categories to cards
layout.addEventListener('click', (event)=>{

    //part for main page when we change categories to cards
    if(event.target.closest('.card-main')){
        for(let key in cards){
            if(event.target.closest('.card-main').getAttribute('href') === `#${key}`){
                layout.innerHTML = ''
                createCards(key); 
           }
        }
    }

    //part for cards when we push for arrwos to change side of card
    if(event.target.closest('.card')){
    
       if(event.target.className === 'card__front__arrows'){
            event.target.parentNode.parentNode.firstChild.classList.add('rotateBack');
            event.target.parentNode.parentNode.lastChild.classList.add('rotateFront');

            event.target.parentNode.parentNode.addEventListener('mouseleave', ()=>{
                event.target.parentNode.parentNode.firstChild.classList.remove('rotateBack');
                event.target.parentNode.parentNode.lastChild.classList.remove('rotateFront');
            })
       }
    }

    
})
