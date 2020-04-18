import {cards} from './js/cards';
import {Card} from './js/Card';
import {layout, navBar, switchBar, buttonStart, switchHeader} from './js/constants';
import {imageCardInitialState, titleCardInitialState, arrowsCardInitialState, removeTitlesFromCards, removeArrowsFromCards, imageFitToAllDiv, changeColorOfCategoryPlayState, changeColorOfCategoryTrainMode, changeColorNavBarOnPlayMode, changeColorNavBarOnTrainMode, changeColorSwitchBarOnPlayMode, changeColorSwitchBarOnTrainMode, removeUnderlineFromNavbarLink} from './js/stateFunctions';
import {addStarWin, addStarWrong} from './js/ratingFunctions';


//Window listener
window.addEventListener('load', ()=>{
    if(cards){
        renderCategoriesToDom();
    }
})


//render categories to DOM for the first time load page
const renderCategoriesToDom = () => {

    layout.innerHTML = '';
    createCategories(cards);
}


//Create cards function
const createCards = (key) => {
    cards[key].forEach((el)=>{
        layout.append(new Card(el).createCategory());

        //if game state is true we transform cards for play mode
        if(stateGamePlay === true){
            buttonStart.style.display = 'block';
            removeTitlesFromCards();
            removeArrowsFromCards();
            imageFitToAllDiv();
        }
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
        
        //check if state is play - make play state of categories and delete a button 'start game'
        if(stateGamePlay === true){
            changeColorOfCategoryPlayState();
            buttonStart.style.display = 'none';
        }
    }
    //add underline to main page in navbar
    document.querySelector("body > div > header > div.hamburger > nav > ul > li:nth-child(1) > a").classList.add('underline');
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

        //watching what category was clicked, get attribute and look for this ket in obj and create cards
        for(let key in cards){
            if(event.target.closest('.card-main').getAttribute('href') === `#${key}`){
                layout.innerHTML = ''
                createCards(key); 

                //make new this
                let newKey = key;
                //add underline to navbar for current category
                document.querySelectorAll('.navbar__link').forEach((el)=>{
                    if(el.getAttribute('href') === `#${newKey}`){
                        el.classList.add('underline')
                    }
                })
                //delete underline from main page in navbar
                document.querySelector("body > div > header > div.hamburger > nav > ul > li:nth-child(1) > a").classList.remove('underline');
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

        const audio = new Audio(`./assets/audio/${event.target.textContent}.mp3`);
        setTimeout(()=>{
            audio.play()
        }, 700)
       }
    }
})


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



let stateGamePlay = false;

// switchBar handler to switch between Train/Play mode
switchBar.addEventListener('click', ()=>{
    if(stateGamePlay === false){
        switchHeader.textContent = 'Play';
        stateGamePlay = true;
        removeTitlesFromCards();
        removeArrowsFromCards();
        imageFitToAllDiv();
        changeColorOfCategoryPlayState();
        changeColorNavBarOnPlayMode();
        changeColorSwitchBarOnPlayMode();
    } else if (stateGamePlay === true){
        buttonStart.style.display = 'none';
        switchHeader.textContent = 'Train';
        stateGamePlay = false;
        imageCardInitialState();
        titleCardInitialState();
        arrowsCardInitialState();
        changeColorOfCategoryTrainMode();
        changeColorNavBarOnTrainMode();
        changeColorSwitchBarOnTrainMode();
    }
})


//button start handler
buttonStart.addEventListener('click', ()=>{

    if(stateGamePlay === true){

        //arr of words at category
        let arrOfWords = [];
        let arrOfAudios = [];

        //get all words from category
        let words = document.querySelectorAll('.card__front__title');
        words.forEach((el)=>{
            arrOfWords.push(el.textContent);
        });

        arrOfWords.sort(function(){
            return 0.5 - Math.random();
        })
        
         
        //make an array of audios
        for(let i = 0; i < arrOfWords.length; i++){
            arrOfAudios.push(new Audio(`./assets/audio/${arrOfWords[i]}.mp3`))
        }


        arrOfAudios[arrOfAudios.length-1].play();
    
        layout.addEventListener('click', (e)=>{
            if(arrOfAudios[arrOfAudios.length-1].src.includes(e.target.nextElementSibling.textContent)){
                arrOfAudios.pop(arrOfAudios[arrOfAudios.length-1]);
                addStarWin();
            } else {
                addStarWrong();
            }
        })
        
    } 
})
