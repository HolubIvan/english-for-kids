import {cards} from './js/cards';
import {Card} from './js/Card';
import {layout, navBar, switchBar, buttonStart, switchHeader, ratingDiv} from './js/constants';
import {imageCardInitialState, titleCardInitialState, arrowsCardInitialState, removeTitlesFromCards, removeArrowsFromCards, imageFitToAllDiv, changeColorOfCategoryPlayState, changeColorOfCategoryTrainMode, changeColorNavBarOnPlayMode, changeColorNavBarOnTrainMode, changeColorSwitchBarOnPlayMode, changeColorSwitchBarOnTrainMode, removeUnderlineFromNavbarLink, changeTypeButtonStatePlay, changeTypeButtonStateReset, resetOpacityToTrainMode} from './js/stateFunctions';
import {addStarWin, addStarWrong, finalResultSuccessFunction, finalResultFailureFunction} from './js/ratingFunctions';


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
            //hide navbar if navbar link clicked
            document.querySelector("#hamburger-checkbox").checked = false;
            removeUnderlineFromNavbarLink();
            event.target.classList.add('underline');
            //check if play mode is on - make a button visible when clicking navbar
            if(stateGamePlay === true){
                buttonStart.style.display = 'block';
            }
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
        buttonStart.style.display = 'block';
        switchHeader.textContent = 'Play';
        stateGamePlay = true;
        removeTitlesFromCards();
        removeArrowsFromCards();
        imageFitToAllDiv();
        changeColorOfCategoryPlayState();
        changeColorNavBarOnPlayMode();
        changeColorSwitchBarOnPlayMode();
        if(layout.firstChild.className === 'card-main'){
            buttonStart.style.display = 'none';
        }
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
        changeTypeButtonStateReset();
        ratingDiv.innerHTML = '';
        resetOpacityToTrainMode();
        arrOfWords.length = 0;
        arrOfAudios.length = 0;
    }
})






//arr of words at category
let arrOfWords = [];
let arrOfAudios = [];

//button start handler
buttonStart.addEventListener('click', (event)=>{

    //check if state of game is true
    if(stateGamePlay === true){

        //check if a game hasn't started and this is first click
        if(buttonStart.getAttribute('value') === 'Start Game'){

            //change state of button
            changeTypeButtonStatePlay();

            //get all words from category
            let words = document.querySelectorAll('.card__front__title');
            words.forEach((el)=>{
                arrOfWords.push(el.textContent);
            });

            //sort an array of audios
            arrOfWords.sort(function(){
                return 0.5 - Math.random();
            })
            
            
            //make an array of audios
            for(let i = 0; i < arrOfWords.length; i++){
                arrOfAudios.push(new Audio(`./assets/audio/${arrOfWords[i]}.mp3`))
            }

            // first time word play after first click
            function play(){
                setTimeout(()=>{
                    arrOfAudios[arrOfAudios.length-1].play();
                }, 1000);
            }
            play();
            
            //layout handler for waiting click on cards
            layout.addEventListener('click', (e)=>{
                //if cards was clicked - they are inactive
                if(e.target.style.opacity == '0.5'){
                    return false;
                } else {
                    //check if certain card is the same as word played audio
                    if(arrOfAudios[arrOfAudios.length-1].src.includes(e.target.nextElementSibling.textContent) && e.target.className === 'card__front__img'){
                        e.target.style.opacity = '0.5';
                        arrOfAudios.pop(arrOfAudios[arrOfAudios.length-1]);
                        addStarWin();
                        //if an array not empty - play next word
                        if(!!arrOfAudios.length){
                            play();
                        } else {
                            //if an array is empty and all answers were correct
                            if(ratingDiv.children.length == '8'){

                                setTimeout(() => {
                                    //play success song and make an initial state of app
                                    const audio = new Audio(`./assets/audio/success.mp3`);
                                    audio.play();
                                    finalResultSuccessFunction();
                                    ratingDiv.innerHTML = '';
                                    stateGamePlay = false;
                                    changeTypeButtonStateReset();
                                    buttonStart.style.display = 'none';
                                    changeColorSwitchBarOnTrainMode();
                                    document.querySelector('#switch-checkbox').checked = false;
                                    switchHeader.textContent = 'Train';
                                    changeColorNavBarOnTrainMode();
                                    removeUnderlineFromNavbarLink();
                                    arrOfWords.length = 0;
                                    arrOfAudios.length = 0;
    
                                    setTimeout(() => {
                                        renderCategoriesToDom();
                                    }, 2000);
        
                                }, 1000);
                            
                            } else {
                                //if an array is empty but there were mistakes
                                setTimeout(() => {
                                    //play failure song and make an initial state of app
                                    const audio = new Audio(`./assets/audio/failure.mp3`);
                                    audio.play();
                                    finalResultFailureFunction(ratingDiv.children.length - 8);
                                    ratingDiv.innerHTML = '';
                                    stateGamePlay = false;
                                    changeTypeButtonStateReset();
                                    buttonStart.style.display = 'none';
                                    changeColorSwitchBarOnTrainMode();
                                    document.querySelector('#switch-checkbox').checked = false;
                                    switchHeader.textContent = 'Train';
                                    changeColorNavBarOnTrainMode();
                                    removeUnderlineFromNavbarLink();
                                    arrOfWords.length = 0;
                                    arrOfAudios.length = 0;
    
                                    setTimeout(() => {
                                        renderCategoriesToDom();
                                    }, 2000);
        
                                }, 1000);
                                
                            }
                        }
                    } else {
                        addStarWrong();
                    }
                }

            })
        //check the value of button and if it was already clicked repeated click will make last word play again
        } else if(buttonStart.getAttribute('value') === ''){
            setTimeout(()=>{
                arrOfAudios[arrOfAudios.length-1].play();
            }, 1000);
        }
        //set the value of button to empty after first click
        buttonStart.setAttribute('value', '');
        
        
    } 
})
