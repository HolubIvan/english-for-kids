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


layout.addEventListener('click', (event)=>{


    // if(event.target.closest('.card-main').getAttribute('href') === '#Action (set C)'){
    //      console.log(cards['Action (set C)'])
    // }

    for(let key in cards){
        if(event.target.closest('.card-main').getAttribute('href') === `#${key}`){
            layout.innerHTML = ''
            createCards(key);
       }
    }

    

   
})