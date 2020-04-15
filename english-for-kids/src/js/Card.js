export class Card{
    constructor(obj){
        this.word = obj.word;
        this.translation = obj.translation;
        this.image = obj.image;
        this.audioSrc = obj.audioSrc;
    }

    createCategory(){
        let node = document.createElement('div');
        node.classList.add('card');

        let frontSide = document.createElement('div');
        frontSide.classList.add('card__front');

        let imgFront = document.createElement('img');
        imgFront.classList.add('card__front__img');
        imgFront.setAttribute('src', `./assets/${this.image}`);

        let titleFront = document.createElement('p');
        titleFront.classList.add('card__front__title');
        titleFront.textContent = this.word;

        let imgArrow = document.createElement('img');
        imgArrow.classList.add('card__front__arrows');
        imgArrow.setAttribute('src', `./assets/img/arrows.png`);

        frontSide.append(imgFront);
        frontSide.append(titleFront);
        frontSide.append(imgArrow);

        let backSide = document.createElement('div');
        backSide.classList.add('card__back');

        let imgBack = document.createElement('img');
        imgBack.classList.add('card__back__img');
        imgBack.setAttribute('src', `./assets/${this.image}`);

        let titleBack = document.createElement('p');
        titleBack.classList.add('card__back__title');
        titleBack.textContent = this.translation;

        backSide.append(imgBack);
        backSide.append(titleBack);

        node.append(frontSide);
        node.append(backSide);

        return node;
    }
}