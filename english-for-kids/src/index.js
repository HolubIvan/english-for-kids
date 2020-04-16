import {cards} from './js/cards';
import {card, Card} from './js/Card';
import {Category} from './js/Category'

console.log(cards)

window.addEventListener('load', ()=>{

    if(cards){
        renderCategoriesToDom();
    }
})


const renderCategoriesToDom = () => {

    let layout = document.querySelector('.main');
    // layout.innerHTML = '';

    // for(let i = 0; i < cards[0].length; i++){
    //     let node = document.createElement('a');
    //     node.setAttribute('href', '#');
    //     node.classList.add('card-main');
    //     let img = document.createElement('img');
    //     img.classList.add('card-main__img');
    //     img.setAttribute('src', `./assets/${cards[i+1][0].image}`);
    //     let title = document.createElement('p');
    //     title.classList.add('card-main__title');
    //     title.textContent = cards[0][i];
    //     node.append(img);
    //     node.append(title);
    //     layout.append(node);
    // } 

    for(let i = 0; i < 8; i++){
        layout.append(new Card(cards[1][i]).createCategory())
    }
        
}


