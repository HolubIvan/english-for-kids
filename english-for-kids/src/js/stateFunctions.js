import {layout, navBar,switchBar, buttonStart, switchHeader,rating} from './constants'

export {imageCardInitialState, titleCardInitialState, arrowsCardInitialState, removeTitlesFromCards, removeArrowsFromCards, imageFitToAllDiv, changeColorOfCategoryPlayState, changeColorOfCategoryTrainMode, changeColorNavBarOnPlayMode, changeColorNavBarOnTrainMode, changeColorSwitchBarOnPlayMode, changeColorSwitchBarOnTrainMode, removeUnderlineFromNavbarLink}



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
//function to change color of categories when play mode turn of
const changeColorOfCategoryTrainMode = ()=>{
    const categories = document.querySelectorAll('.card-main');
    categories.forEach((el)=>{
        el.style.background = 'linear-gradient(rgba(87, 154, 87, 0.3), #579a57)';
    })
}

//function to change navbar background color when play mode turn on
const changeColorNavBarOnPlayMode = ()=>{
    navBar.style.backgroundColor = 'rgb(235, 163, 227)';
}

//function to change navbar background color when play mode turn of
const changeColorNavBarOnTrainMode = ()=>{
    navBar.style.backgroundColor = '#579a57';
}

//function to change navbar background color when play mode turn of
const changeColorSwitchBarOnPlayMode = ()=>{
    switchBar.style.backgroundColor = 'rgb(235, 163, 227)';

}

//function to change navbar background color when play mode turn of
const changeColorSwitchBarOnTrainMode = ()=>{
    switchBar.style.backgroundColor = '#579a57';
}


//removed underline from navbar link function
const removeUnderlineFromNavbarLink = ()=>{
    document.querySelectorAll('.navbar__link').forEach((el)=>{
        if(el.classList.contains('underline')){
            el.classList.remove('underline')
        }
    })
}