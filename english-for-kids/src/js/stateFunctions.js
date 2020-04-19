import {layout, navBar,switchBar, buttonStart, switchHeader,rating} from './constants'

export { imageCardInitialState, changeColorNavBarOnTrainMode, changeColorSwitchBarOnTrainMode, titleCardInitialState, arrowsCardInitialState, changeColorOfCategoryTrainMode, removeTitlesFromCards, removeArrowsFromCards, imageFitToAllDiv, changeColorOfCategoryPlayState, changeColorNavBarOnPlayMode, changeColorSwitchBarOnPlayMode, removeUnderlineFromNavbarLink, changeTypeButtonStatePlay, changeTypeButtonStateReset, resetOpacityToTrainMode}



//function for switchBar to change cards to initial state
const imageCardInitialState = ()=>{
    let img = document.querySelectorAll('.card__front__img');
    img.forEach((el)=>{
        el.style.objectFit = '';
        el.style.height = '';
    })
}


//function for switchBar to change cards to initial state
const titleCardInitialState = ()=>{
    let title = document.querySelectorAll('.card__front__title');
    title.forEach((el)=>{
        el.style.display = 'block';
    })
}


//function for switchBar to change cards to initial state
const arrowsCardInitialState = ()=>{
    let arrows = document.querySelectorAll('.card__front__arrows');
    arrows.forEach((el)=>{
        el.style.display = 'block';
    })
}

    //function to change color of categories when play mode turn of
const changeColorOfCategoryTrainMode = ()=>{
    const categories = document.querySelectorAll('.card-main');
    categories.forEach((el)=>{
        el.style.background = 'linear-gradient(rgba(87, 154, 87, 0.3), #579a57)';
    })
}

//function to change navbar background color when play mode turn of
const changeColorNavBarOnTrainMode = ()=>{
    navBar.style.backgroundColor = '#579a57';
}

//function to change navbar background color when play mode turn of
const changeColorSwitchBarOnTrainMode = ()=>{
    switchBar.style.backgroundColor = '#579a57';
}

//function for switchBar handler to remove titles from cards
const removeTitlesFromCards = ()=>{
   let titles = document.querySelectorAll('.card__front__title');
   titles.forEach((el)=>{
    el.style.display = 'none';
   })
}
//function for switchBar handler to remove arrows from cards
const removeArrowsFromCards = ()=>{
    let arrows = document.querySelectorAll('.card__front__arrows');
    arrows.forEach((el)=>{
    el.style.display = 'none';
    })
}
//function for switchBar handler to fit images for cards
const imageFitToAllDiv = ()=>{
    let img = document.querySelectorAll('.card__front__img');
    img.forEach((el)=>{
        el.style.objectFit = 'none';
        el.style.height = '100%';
    })
}

//function to change color of categories when play mode turn on
const changeColorOfCategoryPlayState = ()=>{
    const categories = document.querySelectorAll('.card-main');
    categories.forEach((el)=>{
        el.style.background = 'linear-gradient(rgba(235, 163, 227, .3), rgb(235, 163, 227))';
    })
}

//function to change navbar background color when play mode turn on
const changeColorNavBarOnPlayMode = ()=>{
    navBar.style.backgroundColor = 'rgb(235, 163, 227)';
}

//function to change navbar background color when play mode turn of
const changeColorSwitchBarOnPlayMode = ()=>{
    switchBar.style.backgroundColor = 'rgb(235, 163, 227)';

}




//removed underline from navbar link function
const removeUnderlineFromNavbarLink = ()=>{
    document.querySelectorAll('.navbar__link').forEach((el)=>{
        if(el.classList.contains('underline')){
            el.classList.remove('underline')
        }
    })
}

//make repeat button from start game button
const changeTypeButtonStatePlay = ()=>{
    // buttonStart.setAttribute('value', '');
    buttonStart.style.backgroundImage = 'url(./assets/img/repeat.svg)';
    buttonStart.style.backgroundRepeat = 'no-repeat';
    buttonStart.style.backgroundSize = '30px';
    buttonStart.style.backgroundPosition = 'center'
}

//reset button to start game state
const changeTypeButtonStateReset = ()=>{
    buttonStart.setAttribute('value', 'Start Game');
    buttonStart.style.backgroundImage = '';
    buttonStart.style.backgroundRepeat = '';
    buttonStart.style.backgroundSize = '';
    buttonStart.style.backgroundPosition = ''
}

const resetOpacityToTrainMode = () =>{
    document.querySelectorAll('.card__front__img').forEach((el)=>{
        el.style.opacity = '1'
    })
}